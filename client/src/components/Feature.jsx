import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

const Feature = ({ title, imgUrl, description, altTag, buttonTitle, link }) => {
  const navigate = useNavigate();

  return (
    <div className="font-epilogue font-semibold">
      <h2 className="sm:text-4xl text-2xl text-white sm:mt-[100px] mt-[50px] tracking-wide text-center">
        {title}
      </h2>

      <div className="flex">
        <div className="h-[350px] w-full flex sm:flex-row flex-col items-center jsutify-center mx-[230px] gap-4">
          <img src={imgUrl} alt={altTag} className="h-[80%] w-[80%]" />
          <p className="sm:text-xl text-xs text-[#818183] tracking-wider text-left items-start ml-[20px] mr-[60px]">
            {description}

            <CustomButton
              btnType="button"
              title={buttonTitle}
              styles="block w-auto bg-[#1dc071] mt-[15px] outline-none"
              handleClick={() => {
                // setIsActive(link.name);
                navigate(link);
              }}
              isConnected={true}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
