import React from "react";
import CopyContent from "./CopyContent";

const FormFieldCopy = ({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  isDisabled,
  smallerFont,
  textToCopy,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}

      <div className="flex flex-row max-w-[435px] sm:max-w-[458px] bg-[#1c1c24] rounded-[10px] border-[1px] border-[#3a3a43] justify-between">
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          className={`py-[15px] sm:pl-[20px] pl-[15px] outline-none
          bg-transparent font-epilogue text-white  sm:text-[14px] placeholder:text-[#4b5264]  sm:min-w-[390px] min-w-[300px] ${smallerFont}`}
          disabled={isDisabled}
        />

        <div className="flex items-center mr-4">
          <CopyContent textToBeCopied={textToCopy} />
        </div>
      </div>
    </label>
  );
};

export default FormFieldCopy;
