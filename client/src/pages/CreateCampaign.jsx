import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";

import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { address, createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    fileHash: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleForFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    checkIfImage(form.image, async (exits) => {
      if (exits) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/campaigns");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });

    // setForm({
    //   name: "",
    //   title: "",
    //   description: "",
    //   fileHash: "",
    //   target: "",
    //   deadline: "",
    //   image: "",
    // });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign 🚀
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full sm:mt-[50px] mt-[35px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => {
              handleForFieldChange("name", e);
            }}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => {
              handleForFieldChange("title", e);
            }}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your Story"
          isTextArea
          value={form.description}
          handleChange={(e) => {
            handleForFieldChange("description", e);
          }}
        />
        <div className="w-full flex flex-row justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-white text-[25px] ml-[20px]">
            You will 100% of the raised amount
          </h4>
        </div>

        <FormField
          labelName="File Hash *"
          placeholder="File hash of your document"
          inputType="text"
          value={form.fileHash}
          handleChange={(e) => {
            handleForFieldChange("fileHash", e);
          }}
          smallerFont="text-[10px]"
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="10 MATIC"
            inputType="number"
            value={form.target}
            handleChange={(e) => {
              handleForFieldChange("target", e);
            }}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date *"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => {
              handleForFieldChange("deadline", e);
            }}
          />
        </div>

        <FormField
          labelName="Campaign Image *"
          placeholder="Place image url of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => {
            handleForFieldChange("image", e);
          }}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
            isConnected={address}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
