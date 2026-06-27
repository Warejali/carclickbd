"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Upload,
  Select,
  Modal,
  Card} from "antd";

import Image from "next/image";
import ProductFormStep from "./ProductFormStep";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import { ISecondStepStoreAbleData,  } from "../type/type";
import {PlusOutlined} from "@ant-design/icons";
import {productMedia} from "../action/store";

const ProductMedia: React.FC = () => {
  const [form] = Form.useForm();
  const [mainPhotoFile, setMainPhotoFile] = useState<File | any>(null);
  const [enteriorPhotoFiles, setEnteriorPhotos] = useState<File[] | any>([]);
  const [exteriorPhotoFiles, setExteriorPhotos] = useState<File[] | any>([]);
  const [mechanicalPhotoFiles, setMechanicalPhotos] = useState<File[] | any>(
    []
  );
  const [otherPhotoFiles, setOtherPhotos] = useState<File[] | any>([]);
  const [docsPhotoFiles, setDocsPhotos] = useState<File[] | any>([]);

  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState(false);

  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep
  );

  // Retrieving items from localStorage
  useEffect(() => {
    const loadMedia = async () => {
      await productMedia.loadProductMediaFromLocalStorage(form, {
        mainPhoto: setMainPhotoFile,
        otherPhotos: setOtherPhotos,
        docsPhotos: setDocsPhotos,
        enteriorPhotos: setEnteriorPhotos,
        exteriorPhotos: setExteriorPhotos,
        mechanicalPhotos: setMechanicalPhotos,
        videoLinks: setVideoLinks,
      });
    };

    loadMedia();
  }, [form]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: ISecondStepStoreAbleData = {
    mainPhotoFile,
    enteriorPhotoFiles,
    exteriorPhotoFiles,
    mechanicalPhotoFiles,
    otherPhotoFiles,
    docsPhotoFiles,
    videoLinks,
  };
  // Save to local storage whenever there’s a change
  useEffect(() => {
    productMedia.storeProductMediaToLocalStorage(data);
  }, [data, form]);

  const handlePreview = (file: any) => {
    setPreviewImage(file.thumbUrl || file.url || "");
    setPreviewVisible(true);
  };
  const handleMainPhotoChange = ({ fileList }: { fileList: File[] | any }) => {
    const newMainPhoto = fileList[0] || null;
    setMainPhotoFile(newMainPhoto);
  };

  const handleVideoLinksChange = (links: string[] | any) => {
    setVideoLinks(links);
  };

  const nextStep = () => {
    dispatch(setProductFormStep(currentStep + 1));
  };

  const uploadButton = (
    <button
      className="border-dotted border-2 border-gray-300 p-2 rounded-lg "
      type="button"
    >
      <PlusOutlined />
      <h3>Upload</h3>
    </button>
  );

  const handleChangePhotos = ({
    fileList,
    setFileList,
  }: {
    fileList: any[];
    setFileList: React.Dispatch<React.SetStateAction<any[]>>;
  }) => {
    if (fileList.length <= 10) {
      setFileList(fileList);
    }
  };

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        nextStep();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="overflow-y-auto">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Card>
          {/* main photo */}
          <Form.Item
            name="mainPhoto"
            label="Main Photo"
            rules={[
              { required: true, message: "Please upload the main photo!" },
            ]}
          >
            <Upload
              listType="picture"
              fileList={mainPhotoFile ? [mainPhotoFile] : []}
              onPreview={handlePreview}
              onChange={handleMainPhotoChange}
              maxCount={1}
            >
              {!mainPhotoFile && uploadButton}
            </Upload>
          </Form.Item>

          <div className="md:grid grid-cols-2 gap-4">
            {/* Enterer photos */}
            <Form.Item
              name="enteriorPhotos"
              label="Enterior Photos"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one other photo!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={enteriorPhotoFiles as any}
                onPreview={handlePreview}
                onChange={
                  ({ fileList }) =>
                    handleChangePhotos({
                      fileList,
                      setFileList: setEnteriorPhotos,
                    }) // Pass the correct setter function
                }
                multiple
              >
                {enteriorPhotoFiles.length < 10 && uploadButton}
              </Upload>
            </Form.Item>

            {/* Exterior photos */}
            <Form.Item
              name="exteriorPhotos"
              label="Exterior Photos"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one document photo!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={exteriorPhotoFiles as any}
                onPreview={handlePreview}
                onChange={({ fileList }) =>
                  handleChangePhotos({
                    fileList,
                    setFileList: setExteriorPhotos,
                  })
                }
                multiple
              >
                {exteriorPhotoFiles.length < 10 && uploadButton}
              </Upload>
            </Form.Item>

            {/*  Mechanical photos */}
            <Form.Item
              name="mechanicalPhotos"
              label="Mechanical Photos"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one document photo!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={mechanicalPhotoFiles as any}
                onPreview={handlePreview}
                onChange={({ fileList }) =>
                  handleChangePhotos({
                    fileList,
                    setFileList: setMechanicalPhotos,
                  })
                }
                multiple
              >
                {mechanicalPhotoFiles.length < 10 && uploadButton}
              </Upload>
            </Form.Item>
          </div>

          <div className="md:grid grid-cols-2 gap-4">
            {/* Other photos */}
            <Form.Item
              name="otherPhotos"
              label="Other Photos"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one other photo!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={otherPhotoFiles as any}
                onPreview={handlePreview}
                onChange={({ fileList }) =>
                  handleChangePhotos({
                    fileList,
                    setFileList: setOtherPhotos,
                  })
                }
                multiple
              >
                {otherPhotoFiles.length < 10 && uploadButton}
              </Upload>
            </Form.Item>

            {/* Documents */}
            <Form.Item
              name="docsPhotos"
              label="Documents"
            
            >
              <Upload
                listType="picture-card"
                fileList={docsPhotoFiles as any}
                onPreview={handlePreview}
                onChange={({ fileList }) =>
                  handleChangePhotos({
                    fileList,
                    setFileList: setDocsPhotos,
                  })
                }
                multiple
              >
                {docsPhotoFiles.length < 10 && uploadButton}
              </Upload>
            </Form.Item>
          </div>
        </Card>
        <Card className="!my-4">
          <Form.Item
            name="videoLinks"
            label="Videos"
            rules={[
              {
                required: false,
                message: "Please add at least one YouTube link!",
              },
              {
                validator: (_, value) =>
                  value.every(validateYouTubeUrl)
                    ? Promise.resolve()
                    : Promise.reject("Invalid YouTube URL(s)"),
              },
            ]}
          >
            <Select
              mode="tags"
              placeholder="Add video URLs"
              tokenSeparators={[","]}
              onChange={handleVideoLinksChange}
            />
          </Form.Item>
        </Card>

        <div>
          <ProductFormStep />
        </div>
      </Form>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image
          src={previewImage}
          alt="Preview"
          layout="responsive"
          width={200}
          height={200}
        />
      </Modal>
    </div>
  );
};

export default ProductMedia;