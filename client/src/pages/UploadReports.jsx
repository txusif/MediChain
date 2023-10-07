import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import toast from "react-hot-toast";

import {
  CustomButton,
  FormField,
  Loader,
  FileUploadComponent,
} from "../components";

import { uploadReports } from "../assets";

const notify = () => toast.error("Only registered labs can uplaod reports");

const uploadClicked = () => console.log("Uploading");

const UploadReports = ({ setIsActive }) => {
  setIsActive("Upload Reports");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorisedLab, setIsAuthorisedLab] = useState(false);
  const { address, saveReport, contract, isLab } = useStateContext();

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

  const fetch = async () => {
    const isAuthLab = await isLab(address);
    setIsAuthorisedLab(isAuthLab);
    console.log("Lab: " + isAuthLab);
  };

  useEffect(() => {
    if (contract) fetch();
  }, [address, contract]);

  const handleForFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(formatedForm);
    await saveReport({ ...formatedForm, fileHash: contentId });
    toast.success("Report uploaded");

    setIsLoading(false);
    navigate("/search-report");
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center gap-[5px] p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <img
          src={uploadReports}
          alt="uploadReports"
          className="flex h-[40px] w-[40px] items-center justify-center"
        />
        <h1 className="font-epilogue font-bold sm:text[25px] text-[18px] leading-[38px] items-center justify-center text-white">
          Upload Report
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full sm:mt-[50px] mt-[35px] flex flex-col gap-[30px]"
      >
        <div className="p-3 rounded-[10px] sm:w-[400px] outline-none border-[1px] border-[#3a3a43]">
          <FileUploadComponent
            address={address}
            contentId={contentId}
            setContentId={setContentId}
            fileURI={fileURI}
            setFileURI={setFileURI}
            isLab={isAuthorisedLab}
            notify={notify}
          />
        </div>

        <FormField
          labelName="File Hash *"
          placeholder="Upload report to get the file hash"
          inputType="text"
          value={contentId}
          isDisabled
          smallerFont="text-[10px]"
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Patient Address *"
            placeholder="0x63aCF7f4ccff48A3378b304bdAb9CA0b98aFE70F"
            inputType="text"
            value={form.userAddress}
            handleChange={(e) => {
              handleForFieldChange("userAddress", e);
            }}
            smallerFont="text-[11.5px]"
          />

          <FormField
            labelName="Category *"
            placeholder="Blood Report"
            inputType="text"
            value={form.category}
            handleChange={(e) => {
              handleForFieldChange("category", e);
            }}
            smallerFont="text-[13px]"
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Age *"
            placeholder="27"
            inputType="number"
            value={form.age}
            handleChange={(e) => {
              handleForFieldChange("age", e);
            }}
            smallerFont="text-[13px]"
          />
          <FormField
            labelName="Height *"
            placeholder="6"
            inputType="number"
            value={form.height}
            handleChange={(e) => {
              handleForFieldChange("height", e);
            }}
            smallerFont="text-[13px]"
          />
          <FormField
            labelName="Weight *"
            placeholder="40"
            inputType="number"
            value={form.weight}
            handleChange={(e) => {
              handleForFieldChange("weight", e);
            }}
            smallerFont="text-[13px]"
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
            smallerFont="text-[13px]"
          />
          <FormField
            labelName="Blood Group *"
            placeholder="B+"
            inputType="text"
            value={form.bloodGroup}
            handleChange={(e) => {
              handleForFieldChange("bloodGroup", e);
            }}
            smallerFont="text-[13px]"
          />
        </div>

        <div className="flex justify-center items-center mt-[10px]">
          <CustomButton
            btnType={isAuthorisedLab ? "submit" : "button"}
            title="Upload Report"
            styles="bg-[#1dc071]"
            isConnected={address}
            handleClick={isAuthorisedLab ? uploadClicked : notify}
          />
        </div>

        {/* <FileUploadComponent
          address={address}
          contentId={contentId}
          setContentId={setContentId}
          fileURI={fileURI}
          setFileURI={setFileURI}
        /> */}
      </form>
    </div>
  );
};

export default UploadReports;
