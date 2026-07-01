"use client";
import React, { useState } from "react";
import { Form, Row, Col, Modal, message, Image, Button } from "antd";
import dayjs from "dayjs";
import { useCreateProductMutation } from "@/Redux/api/productApi";

// Sections
import MediaSection from "./MediaSection";
import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import VehicleDetailsSection from "./VehicleDetailsSection";
import LocationSection from "./LocationSection";
import FeatureTagsSection from "./FeatureTagsSection";

const ProductCreateForm: React.FC = () => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // Local media state
  const [mainPhotoFile, setMainPhotoFile] = useState<any>(null);
  const [otherPhotoFiles, setOtherPhotoFiles] = useState<any[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);

  const handlePreview = (file: any) => {
    setPreviewImage(file.thumbUrl || file.url || "");
    setPreviewVisible(true);
  };

  const onFinish = async (values: any) => {
    try {
      const start = values.startBid;
      const end = values.endBid;

      if (start && end && dayjs(end).isBefore(dayjs(start))) {
        message.error("End time must be after start time");
        return;
      }

      // 🔹 Validation
      if (!mainPhotoFile) {
        message.error("Main photo is required!");
        return;
      }
      if (!otherPhotoFiles.length) {
        message.error("Please upload at least one other photo!");
        return;
      }

      // 🧱 Build JSON payload
      const generatedTitle = [
        values.launchingYear,
        values.make,
        values.model,
        values.grade,
      ]
        .filter(Boolean)
        .join(" ");

      const productData = {
        ...values,
        title: generatedTitle,
        maker: values.make,
        year: values.launchingYear,
        engineSize: values.engine,
        driveType: values.drivetrain,
        bodyType: values.bodyStyle,
        exteriorColor: values.color,
        vinChassisNumber: values.vin,
        price: values.mainPrice,
        featuresOptions: values.featuresAndOptions,
        equipment: values.featuresAndOptions,
        highlights: values.featuresAndOptions,
        startBid: start ? dayjs(start).toISOString() : null,
        endBid: end ? dayjs(end).toISOString() : null,
        videos: videoLinks,
      };

      // 🧱 Build multipart form
      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));

      // ✅ Append main photo
      const main =
        mainPhotoFile.originFileObj ||
        mainPhotoFile.file ||
        mainPhotoFile;
      if (main instanceof File) {
        formData.append("mainPhoto", main);
      }

      // ✅ Append other photos (safe fallback)
      otherPhotoFiles.forEach((file: any) => {
        const actual =
          file.originFileObj ||
          file.file ||
          file.url ||
          null;
        if (actual instanceof File) {
          formData.append("others", actual);
        }
      });

      // 🧾 Debug (optional)
      // for (let [key, val] of formData.entries()) {
      //   console.log("🟦", key, val);
      // }

      const res = await createProduct(formData).unwrap();

      if (res?.statusCode === 201) {
        message.success("✅ Product created successfully!");
        form.resetFields();
        setMainPhotoFile(null);
        setOtherPhotoFiles([]);
        setVideoLinks([]);
      } else {
        message.error(res?.message || "Failed to create product");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err?.data?.message || "Failed to create product");
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="bg-white p-6 rounded"
      >
        <Row gutter={[24, 24]}>
          {/* LEFT PANEL */}
          <Col xs={24} lg={16}>
            <BasicInfoSection />
            <PricingSection />
            <VehicleDetailsSection />
            <LocationSection />
            <FeatureTagsSection />
          </Col>

          {/* RIGHT PANEL */}
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

        {/* 🔹 Submit Button */}
        <div className="flex justify-end mt-8">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            className="px-8 h-12"
          >
            Create Product
          </Button>
        </div>
      </Form>

      {/* 🔹 Image Preview Modal */}
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
