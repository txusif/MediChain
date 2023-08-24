import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

import {
  CustomButton,
  FormField,
  Loader,
  FileUploadComponent,
} from "../components";

import { uploadReports } from "../assets";

const UploadReports = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { address, saveReport } = useStateContext();

  const [contentId, setContentId] = useState("");
  const [fileURI, setFileURI] = useState("");
  const [form, setForm] = useState({
    fileHash: contentId,
    category: "",
    userAddress: "",

    age: "",
    height: "",
    weight: "",
    gender: "",
    bloodGroup: "",
  });

  const formatedForm = {
    fileHash: form.fileHash,
    category: form.category,
    userAddress: form.userAddress,
    generalInfo: {
      age: form.age,
      height: form.height,
      weight: form.weight,
      gender: form.gender,
      bloodGroup: form.bloodGroup,
    },
  };

  const handleForFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(formatedForm);
    await saveReport({ ...formatedForm, fileHash: contentId });

    setIsLoading(false);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text[25px] text-[18px] leading-[38px] text-white">
          <img src={uploadReports} alt="uploadReports" />
          Upload Report
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Patient Address *"
            placeholder="0x63aCF7f4ccff48A3378b304bdAb9CA0b98aFE70F"
            inputType="text"
            value={form.userAddress}
            handleChange={(e) => {
              handleForFieldChange("userAddress", e);
            }}
          />
          <FormField
            labelName="Category *"
            placeholder="Blood Report"
            inputType="text"
            value={form.category}
            handleChange={(e) => {
              handleForFieldChange("category", e);
            }}
          />
        </div>

        <FormField
          labelName="File Hash *"
          placeholder="Upload report to get the file hash"
          inputType="text"
          value={contentId}
          isDisabled
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Age *"
            placeholder="27"
            inputType="number"
            value={form.age}
            handleChange={(e) => {
              handleForFieldChange("age", e);
            }}
          />
          <FormField
            labelName="Height *"
            placeholder="6"
            inputType="number"
            value={form.height}
            handleChange={(e) => {
              handleForFieldChange("height", e);
            }}
          />
          <FormField
            labelName="Weight *"
            placeholder="40"
            inputType="number"
            value={form.weight}
            handleChange={(e) => {
              handleForFieldChange("weight", e);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Gender *"
            placeholder="Male"
            inputType="text"
            value={form.gender}
            handleChange={(e) => {
              handleForFieldChange("gender", e);
            }}
          />
          <FormField
            labelName="Blood Group *"
            placeholder="B+"
            inputType="text"
            value={form.bloodGroup}
            handleChange={(e) => {
              handleForFieldChange("bloodGroup", e);
            }}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Upload"
            styles="bg-[#1dc071]"
            isConnected={address}
          />
        </div>

        <FileUploadComponent
          address={address}
          contentId={contentId}
          setContentId={setContentId}
          fileURI={fileURI}
          setFileURI={setFileURI}
        />
      </form>
    </div>
  );
};

export default UploadReports;
