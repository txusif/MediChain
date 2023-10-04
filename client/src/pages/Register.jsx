import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

import {
  CopyContent,
  CustomButton,
  FormField,
  FormFieldCopy,
  Loader,
} from "../components";

const tabsItems = ["Register as Doctor", "Register as Lab"];

const TabsComponent = ({ name, onSelect, bg }) => {
  return (
    <li className=" mx-1 md:mx-6">
      <div
        onClick={onSelect}
        className={`font-epilogue font-semibold inline-block py-2 px-3 md:py-3 md:px-4 rounded-t-lg  hover:bg-[#0ac5a8]/80 dark:hover:bg-[#0ac5a8]/80 hover:text-gray-50 dark:hover:text-gray-800 text-[14px] md:text-[24px] cursor-pointer ${
          bg && "bg-[#0ac5a8]/60 text-gray-700 dark:text-gray-200"
        }`}
      >
        {name}
      </div>
    </li>
  );
};

const Register = ({ setIsActive }) => {
  setIsActive("Register");
  const { address, contract, register, isDoctor, isLab } = useStateContext();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openTab, setOpenTab] = useState(0);
  const [isAuthorisedDoctor, setIsAuthorisedDoctor] = useState(false);
  const [isAuthorisedLab, setIsAuthorisedLab] = useState(false);

  const [form, setForm] = useState({
    name: "",
    id: "",
  });
  // console.log(openTab);

  const handleForFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // if (!form.name || !form.id) return;

    setIsLoading(true);
    await register(form.name, form.id, openTab);
    setIsLoading(false);
    navigate("/upload-reports");
  };

  const fetch = async () => {
    const isAuthDoctor = await isDoctor(address);
    setIsAuthorisedDoctor(isAuthDoctor);
    // console.log("Doctor: " + isAuthDoctor);

    const isAuthLab = await isLab(address);
    setIsAuthorisedLab(isAuthLab);
    // console.log("Lab: " + isAuthLab);
  };

  useEffect(() => {
    if (contract) fetch();
  }, [address, contract]);

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      {/* <div className="flex justify-center items-center p-[16px] sm:min-w-[280px] bg-[#3a3a43] rounded-[10px]"> */}
      <ul className="flex flex-wrap text-sm font-medium text-center text-white border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabsItems.map((item, index) => (
          <TabsComponent
            key={index}
            bg={openTab === index && true}
            name={item}
            onSelect={() => {
              setOpenTab(index);
              setForm({
                name: "",
                id: "",
              });
            }}
          />
        ))}
      </ul>

      {openTab === 0 && isAuthorisedDoctor ? (
        <p className="font-epilogue text-white text-[16px] sm:text-[25px] font-semibold items-center flex min-h-[440px]">
          You are already registered as Doctor
        </p>
      ) : openTab === 1 && isAuthorisedLab ? (
        <p className="font-epilogue text-white text-[16px] sm:text-[25px] font-semibold items-center flex min-h-[440px]">
          You are already registered as Lab
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="sm:w-[420px] w-[330px] sm:mt-[50px] mt-[35px] flex flex-col gap-[30px]"
        >
          <FormField
            labelName="Name *"
            placeholder={openTab === 0 ? "Dr Salukhe" : "Apollo clinic"}
            inputType="text"
            value={form.name}
            handleChange={(e) => {
              handleForFieldChange("name", e);
            }}
            smallerFont="text-[13px]"
          />

          <FormFieldCopy
            labelName="Address *"
            placeholder="Your wallet address"
            inputType="text"
            value={address}
            isDisabled
            smallerFont="text-[11.5px]"
            textToCopy={address}
          />
          {/* <CopyContent textToCopy={address} /> */}

          <FormField
            labelName="Unique Id *"
            placeholder="Enter your unique id"
            inputType="text"
            value={form.id}
            handleChange={(e) => {
              handleForFieldChange("id", e);
            }}
            smallerFont="text-[13px]"
          />

          <div className="flex justify-center items-center">
            <CustomButton
              btnType="submit"
              title="Register"
              styles="bg-[#1dc071]"
              isConnected={address}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
