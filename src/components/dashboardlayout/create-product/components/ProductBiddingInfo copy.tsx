"use client";
import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  InputNumber,
  Input,
  Row,
  Col,
  Tooltip,
  message,
} from "antd";
import { IProduct } from "@/Interface/product";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";

import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { base64ToFile } from "@/utils/file";
import {
  getFromLocalStorageAsParse,
  removeFromLocalStorage,
  setToLocalStorageAsStringify,
} from "@/utils/local-storage";
import { useCreateProductMutation } from "@/Redux/api/productApi";
import { productFormStepValueKeys } from "../../product.storage-key";

// File validation constants
const FILE_LIMITS = {
  MAIN_PHOTO: 1,
  OTHER_PHOTOS: 10,
  Enterior_PHOTOS: 10,
  EXTERIOR_PHOTOS: 10,
  MECHANICAL_PHOTOS: 10,
  DOC_PHOTOS: 10,
};

// Validation function for files
const validateFiles = (
  files: File[],
  maxCount: number,
  fieldName: string
): boolean => {
  if (!files.length) {
    message.error(`${fieldName} is required`);
    return false;
  }
  if (files.length > maxCount) {
    message.error(`Maximum ${maxCount} files are allowed for ${fieldName}`);
    return false;
  }
  return true;
};

const ProductBiddingInfo = () => {
  const [form] = Form.useForm();

  // Essential state
  const [stepOneFormData, setStepOneFormData] = useState<IProduct | null>(null);
  const [stepThreeFormData, setStepThreeFormData] = useState<IProduct | null>(
    null
  );
  const [stepFourFormData, setStepFourFormData] = useState<IProduct | null>(
    null
  );

  // Media files state
  const [mainPhotoFile, setMainPhotoFile] = useState<File | null>(null);
  const [enteriorPhotoFiles, setEnteriorPhotosFiles] = useState<File[]>([]);
  const [exteriorPhotoFiles, setExteriorPhotosFiles] = useState<File[]>([]);
  const [mechanicalPhotoFiles, setMechanicalPhotosFiles] = useState<File[]>([]);
  const [otherPhotoFiles, setOtherPhotosFiles] = useState<File[]>([]);
  const [docsPhotoFiles, setDocsPhotosFiles] = useState<File[]>([]);

  const [videoLinks, setVideoLinks] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // load from local storage
  useEffect(() => {
    const loadFormDataFromLocalStorage = () => {
      try {
        // Helper function to safely parse JSON
        const parseJSON = <T,>(key: string, fallback: T): T => {
          const item = localStorage.getItem(key);
          if (!item) return fallback;
          try {
            return JSON.parse(item);
          } catch {
            return fallback;
          }
        };

        // Load step-5 product bidding info
        const savedStepFiveData = parseJSON(
          productFormStepValueKeys.stepFive,
          null
        ) as any;

        if (savedStepFiveData) {
          if (savedStepFiveData.startBid || savedStepFiveData.endBid) {
            savedStepFiveData.startBid =
              savedStepFiveData.startBid && moment(savedStepFiveData.startBid);
            savedStepFiveData.endBid =
              savedStepFiveData.endBid && moment(savedStepFiveData.endBid);
          }
          form.setFieldsValue(savedStepFiveData);
        }

        const stepOne = getFromLocalStorageAsParse(
          productFormStepValueKeys.stepOne
        );
        if (!stepOne) {
          dispatch(setProductFormStep(0));
          return;
        }

        // Load main photo
        const mainPhoto = parseJSON<string | null>("mainPhoto", null);
        if (mainPhoto) {
          setMainPhotoFile(base64ToFile(mainPhoto, "mainProductImg"));
        } else {
          dispatch(setProductFormStep(1));
          return;
        }

        // Load  enterior photos
        const enteriorPhotos = parseJSON<string[]>("enteriorPhotos", []);
        if (enteriorPhotos.length > 0) {
          const files = enteriorPhotos.map((url, index) =>
            base64ToFile(url, `enterior${index}`)
          );
          if (
            !validateFiles(
              files,
              FILE_LIMITS.Enterior_PHOTOS,
              "Enterior Photos"
            )
          ) {
            dispatch(setProductFormStep(1));
            return;
          }
          setEnteriorPhotosFiles(files);
        }

        // Load exterior photos
        const exteriorPhotos = parseJSON<string[]>("exteriorPhotos", []);
        if (exteriorPhotos.length > 0) {
          const files = exteriorPhotos.map((url, index) =>
            base64ToFile(url, `productPhoto-${index}`)
          );
          if (
            !validateFiles(
              files,
              FILE_LIMITS.EXTERIOR_PHOTOS,
              "Exterior Photos"
            )
          ) {
            dispatch(setProductFormStep(1));
            return;
          }
          setExteriorPhotosFiles(files);
        }

        // Load mechanical photos
        const mechanicalPhotos = parseJSON<string[]>("mechanicalPhotos", []);
        if (mechanicalPhotos.length > 0) {
          const files = mechanicalPhotos.map((url, index) =>
            base64ToFile(url, `mechanical${index}`)
          );
          if (
            !validateFiles(
              files,
              FILE_LIMITS.MECHANICAL_PHOTOS,
              "Mechanical Photos"
            )
          ) {
            dispatch(setProductFormStep(1));
            return;
          }
          setMechanicalPhotosFiles(files);
        }

        // Load other photos
        const otherPhotos = parseJSON<string[]>("otherPhotos", []);
        if (otherPhotos.length > 0) {
          const files = otherPhotos.map((url, index) =>
            base64ToFile(url, `othersproductphoto${index + 1}`)
          );
          if (!validateFiles(files, FILE_LIMITS.OTHER_PHOTOS, "Other Photos")) {
            dispatch(setProductFormStep(1));
            return;
          }
          setOtherPhotosFiles(files);
        }

        // Load docs photos
        const docsPhotos = parseJSON<string[]>("docsPhotos", []);
        if (docsPhotos.length > 0) {
          const files = docsPhotos.map((url, index) =>
            base64ToFile(url, `productDocPhoto${index}`)
          );
          if (
            !validateFiles(files, FILE_LIMITS.DOC_PHOTOS, "Document Photos")
          ) {
            dispatch(setProductFormStep(1));
            return;
          }
          setDocsPhotosFiles(files);
        }

        // Load video links
        setVideoLinks(parseJSON<string[]>("videoLinks", []));

        // Load form steps data

        const stepThree = getFromLocalStorageAsParse(
          productFormStepValueKeys.stepThree
        );

        const stepFour = getFromLocalStorageAsParse(
          productFormStepValueKeys.stepFour
        );

        if (!stepThree) {
          dispatch(setProductFormStep(2));
          return;
        }
        if (!stepFour) {
          dispatch(setProductFormStep(3));
          return;
        }

        setStepOneFormData(stepOne);
        setStepThreeFormData(stepThree);
        setStepFourFormData(stepFour);
      } catch (error) {
        message.error("Failed to load form data");
        dispatch(setProductFormStep(0));
      }
    };

    loadFormDataFromLocalStorage();
  }, [dispatch, form]);

  // storing data in this page form data in localstorage for user better experience
  const onValuesChange = (_: any, allValues: IProduct) => {
    setToLocalStorageAsStringify(
      productFormStepValueKeys.stepFive,
      JSON.stringify(allValues)
    );
  };

  const onFinish = async (values: IProduct) => {
    try {
      // Validate required files
      if (
        !validateFiles([mainPhotoFile!], FILE_LIMITS.MAIN_PHOTO, "Main Photo")
      )
        return;
      if (
        !validateFiles(
          otherPhotoFiles,
          FILE_LIMITS.OTHER_PHOTOS,
          "Other Photos"
        )
      )
        return;
      if (
        !validateFiles(
          docsPhotoFiles,
          FILE_LIMITS.DOC_PHOTOS,
          "Document Photos"
        )
      )
        return;
      if (
        !validateFiles(
          exteriorPhotoFiles,
          FILE_LIMITS.EXTERIOR_PHOTOS,
          "Exterior Photos"
        )
      )
        return;
      if (
        !validateFiles(
          enteriorPhotoFiles,
          FILE_LIMITS.Enterior_PHOTOS,
          "Enterior Photos"
        )
      )
        return;
      if (
        !validateFiles(
          mechanicalPhotoFiles,
          FILE_LIMITS.MECHANICAL_PHOTOS,
          "Mechanical Photos"
        )
      )
        return;

      // Combine all form data
      const productData: IProduct = {
        ...values,
        videos: videoLinks,
        ...stepOneFormData,
        ...stepThreeFormData,
        ...stepFourFormData,
      };

      const formData = new FormData();

      // Append the JSON data
      formData.append("data", JSON.stringify(productData));

      // Append files.  Important to append data *before* files.
      formData.append("mainPhoto", mainPhotoFile!);

      const appendFiles = (key: string, files: File[]) => {
        files.forEach((file) => formData.append(key, file));
      };

      appendFiles("interior", enteriorPhotoFiles);
      appendFiles("exterior", exteriorPhotoFiles);
      appendFiles("mechanical", mechanicalPhotoFiles);
      appendFiles("others", otherPhotoFiles);
      appendFiles("docs", docsPhotoFiles);

      const response = await createProduct(formData).unwrap();

      if (response?.statusCode === 201) {
        message.success("Product created successfully");
        // Clear all form data from localStorage
        dispatch(setProductFormStep(5));

        [
          productFormStepValueKeys.stepOne,
          productFormStepValueKeys.stepThree,
          productFormStepValueKeys.stepFour,
          productFormStepValueKeys.stepFive,
          "mainPhoto",
          "enteriorPhotos",
          "exteriorPhotos",
          "mechanicalPhotos",
          "otherPhotos",
          "docsPhotos",
          "videoLinks",
        ].forEach((key) => removeFromLocalStorage(key));

        // Reset file states
        setMainPhotoFile(null);
        setEnteriorPhotosFiles([]);
        setExteriorPhotosFiles([]);
        setMechanicalPhotosFiles([]);
        setOtherPhotosFiles([]);
        setDocsPhotosFiles([]);
        setVideoLinks([]);
        form.resetFields(); // Reset the form fields

      }
    } catch (error: any) {
      console.error(error);
      message.error(
        error?.data?.message || "An unexpected error occurred"
      );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      className="bg-white p-4 rounded"
      disabled={isLoading}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            name={["minBid"]}
            label={
              <span>
                Minimum Bid{" "}
                <Tooltip title="The starting bid amount for the product">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: false, message: "Please enter the minimum bid" },
              {
                type: "number",
                min: 0,
                message: "Minimum bid must be greater than 0",
              },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Enter minimum bid"
              className="w-full"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={12}>
          <Form.Item
            name={["mainPrice"]}
            label={
              <span>
                Price{" "}
                <Tooltip title="Enable the 'Buy Now' functionality for the buyer only if a mainPrice is provided. If mainPrice is not provided, the buying functionality will be disabled.">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[{ required: false }]}
          >
            <InputNumber
              min={0}
              placeholder="Enter minimum Price"
              className="w-full"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            name={["startBid"]}
            label={
              <span>
                Start Bidding Time{" "}
                <Tooltip title="The date and time when bidding starts">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: false, message: "Please select a start time" },
              {
                validator: (_, value) => {
                  const now = moment();
                  if (value && value.isBefore(now, "minute")) {
                    return Promise.reject("Start time cannot be in the past");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              showTime
              placeholder="Select start time"
              className="w-full"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
            />
          </Form.Item>
        </Col>

        <Col span={24} md={12}>
          <Form.Item
            name={["endBid"]}
            label={
              <span>
                End Bidding Time{" "}
                <Tooltip title="The date and time when bidding ends">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: false, message: "Please select an end time" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startBid = getFieldValue([
                    "startBid",
                  ]);
                  if (!value || !startBid) {
                    return Promise.resolve();
                  }
                  if (value.isBefore(startBid)) {
                    return Promise.reject(
                      "End time must be later than the selected start time. Please adjust the 'End Time' field to proceed."
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              showTime
              placeholder="Select end time"
              className="w-full"
              disabledDate={(current) => {
                const startDate = form.getFieldValue([
                  "startBid",
                ]);
                return (
                  current &&
                  (current <= moment().startOf("day") ||
                    (startDate && current <= startDate))
                );
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            name={["location", "city"]}
            label="City"
            rules={[
              { required: true, message: "Please enter the city name" },
              {
                pattern: /^[a-zA-Z\s-]+$/,
                message: "Please enter a valid city name",
              },
            ]}
          >
            <Input placeholder="Enter city" className="w-full" />
          </Form.Item>
        </Col>

        <Col span={24} md={12}>
          <Form.Item
            name={["location", "zipCode"]}
            label="Zip Code"
            rules={[{ required: true, message: "Please enter the zip code" }]}
          >
            <Input placeholder="Enter zip code" className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <div className="mt-4">
        <ProductFormStep isLoading={isLoading} />
      </div>
    </Form>
  );
};

export default ProductBiddingInfo;
