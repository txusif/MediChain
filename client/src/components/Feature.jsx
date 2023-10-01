import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

const Feature = ({ title, imgUrl, description, altTag, buttonTitle, link }) => {
  const navigate = useNavigate();

  return (
    <div className="font-epilogue font-semibold">
      <h2 className="sm:text-4xl text-2xl text-white sm:mt-[100px] mt-[60px] tracking-wide text-center">
        {title}
      </h2>

      <div className="flex">
        <div className="sm:h-[350px] sm:w-full w-[330px] bg-wite flex sm:flex-row flex-col items-center jsutify-center mx-[230px] sm:gap-4 gap-2">
          <img src={imgUrl} alt={altTag} className="h-[80%] w-[80%]" />
          <p className="sm:text-xl text-xs text-[#818183] max-sm:mx-auto tracking-wider max-sm:text-center text-left items-start ml-[20px] mr-[60px]">
            {description}

            <CustomButton
              btnType="button"
              title={buttonTitle}
              styles="block w-auto bg-[#1dc071] mt-[15px] outline-none max-sm:mx-auto"
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
