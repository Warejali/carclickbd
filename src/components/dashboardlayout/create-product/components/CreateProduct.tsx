"use client";
import React from "react";
import { Steps } from "antd";
import ProductMedia from "./ProductMedia";
import CreateProductSuccessfulResult from "./CreateSuccessfulResult";
import { useAppSelector } from "@/Redux/hooks";
import ProductDetailForm from "./ProductDetailsForm";
import ProductSpecification from "./ProductSpecification";
import ProductAddtionalDetails from "./ProductAdditionalDetails";
import ProductBiddingInfo from "./ProductBiddingInfo";

const { Step } = Steps;

const CreateProductForm = () => {
  const currentStep = useAppSelector(
    (state) => state.productReducer.setFormStep,
  );

  return (
    <div className="container mx-auto shadow-lg p-5">
      <Steps
        responsive={true}
        current={currentStep}
        // onChange={(step) => dispatch(setProductFormStep(step))}
      >
        <Step title="Product Details" />
        <Step title="Photos & Videos" />
        <Step title="Specifications" />
        <Step title="Additional Details" />
        <Step title="Bidding Info" />
      </Steps>

      <div className="mt-5 bg-white p-5  rounded-lg">
        {currentStep === 0 && <ProductDetailForm />}
        {currentStep === 1 && <ProductMedia />}
        {currentStep === 2 && <ProductSpecification />}
        {currentStep === 3 && <ProductAddtionalDetails />}
        {currentStep === 4 && <ProductBiddingInfo />}
        {currentStep === 5 && <CreateProductSuccessfulResult />}
      </div>
    </div>
  );
};

export default CreateProductForm;
