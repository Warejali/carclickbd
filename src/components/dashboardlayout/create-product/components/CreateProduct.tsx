"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Redux/api/productApi";
import { getTokenInfo } from "@/service/auth.service";
import BasicInfoSection from "./BasicInfoSection";
import FeatureTagsSection from "./FeatureTagsSection";
import LocationSection from "./LocationSection";
import MediaSection from "./MediaSection";
import PricingSection from "./PricingSection";
import VehicleDetailsSection from "./VehicleDetailsSection";

type ProductCreateFormProps = {
  productId?: string;
};

const toUploadFile = (url: string, index: number, prefix: string) => ({
  uid: `${prefix}-${index}`,
  name: `${prefix}-${index + 1}`,
  status: "done",
  url,
});

const ProductCreateForm: React.FC<ProductCreateFormProps> = ({ productId }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const user = getTokenInfo();
  const isEditMode = Boolean(productId);
  const isSeller = user?.role === "seller";
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [mainPhotoFile, setMainPhotoFile] = useState<any>(null);
  const [otherPhotoFiles, setOtherPhotoFiles] = useState<any[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: productResponse, isLoading: isProductLoading } =
    useGetProductByIdQuery(productId as string, { skip: !productId });

  useEffect(() => {
    const product = productResponse?.data;
    if (!product) return;

    form.setFieldsValue({
      ...product,
      color: product.color || product.exteriorColor,
      vin: product.vin || product.vinChassisNumber,
      featuresAndOptions:
        product.featuresAndOptions || product.equipment || product.highlights,
      videoLinks: product.videos || [],
      status: product.status || (product.isDraft ? "pending" : "approval"),
    });

    if (product.photos?.mainPhoto) {
      setMainPhotoFile(toUploadFile(product.photos.mainPhoto, 0, "main-photo"));
    }
    if (product.photos?.others?.length) {
      setOtherPhotoFiles(
        product.photos.others.map((url: string, index: number) =>
          toUploadFile(url, index, "other-photo")
        )
      );
    }
    setVideoLinks(product.videos || []);
  }, [form, productResponse]);

  const handlePreview = (file: any) => {
    setPreviewImage(file.thumbUrl || file.url || "");
    setPreviewVisible(true);
  };

  const buildProductData = (values: any) => {
    const generatedTitle = [
      values.launchingYear,
      values.make,
      values.model,
      values.grade,
    ]
      .filter(Boolean)
      .join(" ");

    const status = !isEditMode || isSeller ? "pending" : values.status || "pending";

    return {
      ...values,
      title: generatedTitle,
      maker: values.make,
      year: values.launchingYear,
      registrationYear: values.registrationYear || values.launchingYear,
      engineSize: values.engine,
      driveType: values.drivetrain,
      bodyType: values.bodyStyle,
      exteriorColor: values.color,
      vinChassisNumber: values.vin,
      price: values.mainPrice,
      featuresOptions: values.featuresAndOptions,
      equipment: values.featuresAndOptions,
      highlights: values.featuresAndOptions,
      videos: videoLinks,
      status,
      isDraft: status === "pending",
      isSoldOut: status === "sold" || status === "reserve",
    };
  };

  const appendPhotos = (formData: FormData) => {
    const main =
      mainPhotoFile?.originFileObj || mainPhotoFile?.file || mainPhotoFile;
    if (main instanceof File) {
      formData.append("mainPhoto", main);
    }

    otherPhotoFiles.forEach((file: any) => {
      const actual = file?.originFileObj || file?.file || null;
      if (actual instanceof File) {
        formData.append("others", actual);
        formData.append("interior", actual);
        formData.append("interiorPhoto", actual);
        formData.append("interiorPhotos", actual);
        formData.append("exterior", actual);
        formData.append("exteriorPhoto", actual);
        formData.append("exteriorPhotos", actual);
      }
    });
  };

  const requiredFields = [
    ["mainPrice", "Price"],
    ["mileage", "Mileage"],
    ["engine", "Engine Size"],
    ["fuelType", "Fuel Type"],
    ["transmission", "Transmission"],
    ["drivetrain", "Drive Type"],
    ["bodyStyle", "Body Type"],
    ["color", "Color"],
    ["condition", "Condition"],
  ];

  const hasMissingRequiredFields = (values: any) => {
    const missing = requiredFields.filter(([field]) => {
      const value = values[field];
      return value === undefined || value === null || value === "";
    });

    if (missing.length) {
      const [field, label] = missing[0];
      message.error(`${label} is required.`);
      form.scrollToField(field, { behavior: "smooth", block: "center" });
      return true;
    }

    return false;
  };

  const onFinish = async (values: any) => {
    try {
      if (hasMissingRequiredFields(values)) {
        return;
      }

      if (!mainPhotoFile) {
        message.error("Main photo is required!");
        return;
      }
      if (!otherPhotoFiles.length) {
        message.error("Please upload at least one other photo!");
        return;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(buildProductData(values)));
      appendPhotos(formData);

      const res = isEditMode
        ? await updateProduct({ id: productId, data: formData }).unwrap()
        : await createProduct(formData).unwrap();

      if (res?.statusCode === 201 || res?.statusCode === 200 || res?.success) {
        message.success(
          isEditMode
            ? "Product updated and sent for admin approval."
            : "Product created and sent for admin approval."
        );
        form.resetFields();
        setMainPhotoFile(null);
        setOtherPhotoFiles([]);
        setVideoLinks([]);
        router.back();
      } else {
        message.error(res?.message || "Failed to save product");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err?.data?.message || "Failed to save product");
    }
  };

  if (isEditMode && isProductLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded bg-white">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="rounded bg-white p-6"
        initialValues={{ status: "pending" }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <BasicInfoSection />
            <PricingSection />
            <VehicleDetailsSection />
            <LocationSection />
            <FeatureTagsSection />
          </Col>

          <Col xs={24} lg={8}>
            <MediaSection
              onPreview={handlePreview}
              mainPhotoFile={mainPhotoFile}
              setMainPhotoFile={setMainPhotoFile}
              otherPhotoFiles={otherPhotoFiles}
              setOtherPhotoFiles={setOtherPhotoFiles}
              videoLinks={videoLinks}
              setVideoLinks={setVideoLinks}
            />
          </Col>
        </Row>

        <div className="mt-8 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading || isUpdating}
            className="h-12 px-8"
          >
            {isEditMode ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </Form>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image
          src={previewImage || "/placeholder.png"}
          alt="Preview"
          width={600}
          height={400}
        />
      </Modal>
    </>
  );
};

export default ProductCreateForm;
