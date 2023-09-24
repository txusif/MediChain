import React from "react";

import { uploadDate } from "../utils";
import { docImage, thirdweb } from "../assets";
import { CustomButton } from "../components";

const ReportCard = ({
  age,
  bloodGroup,
  category,
  date,
  fileHash,
  gender,
  height,
  lab,
  userAddress,
  weight,
}) => {
  const fileURI = `https://gateway.pinata.cloud/ipfs/`;
  const addDate = uploadDate(date);
  // console.log(addDate);

  return (
    <div className="m-auto sm:m-0 sm:w-[230px] w-[250px] rounded-[15px] bg-[#1c1c24]">
      <div className="sm:w-[200px] w-[220px] h-[200px] rounded-t-[10px] mx-4 mt-4 flex justify-center items-center bg-[#13131a]">
        <img src={docImage} alt="user" className="w-3/4 h-3/4 object-contain" />
      </div>

      <div className="flex flex-col p-4">
        <div className="block">
          <h4 className="font-epilogue mb-[10px] font-semibold text-[15px] text-[#b2b3bd] leading-[22px]">
            {category}
          </h4>
        </div>

        <div className="flex flex-col mb-[10px]">
          <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
            Added By
          </p>
          <p className="flex-1 font-epilogue font-normal text-[13px] sm:text-[12px] text-[#b2b3bd] truncate">
            {/* {lab} */}
            {lab.slice(0, 12)}...{lab.slice(26)}
          </p>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col">
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Added On
            </p>
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {addDate}
            </h4>
          </div>

          <div className="block mt-1 ml-11 sm:ml-7">
            <a
              href={fileURI + fileHash}
              target="_blank"
              className="flex justify-center items-center font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[35px] px-6 rounded-[6px] bg-[#1dc071]"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
