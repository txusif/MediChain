import React from "react";

import { thirdweb } from "../assets";
import { daysLeft, CampaignEndDate } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  fileHash,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  const endDate = CampaignEndDate(deadline);

  return (
    <div
      className={`max-sm:m-auto w-[288px] rounded-[15px] cursor-pointer ${
        amountCollected === target ? "bg-[#395144]" : "bg-[#1c1c24]"
      }
      ${
        remainingDays < 0 && amountCollected !== target
          ? "bg-[#A73121]"
          : "bg-[#1c1c24]"
      }
      
      `}
      onClick={handleClick}
    >
      {/* <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      /> */}
      <div className="w-[257px] h-[257px] rounded-t-[10px] mx-4 mt-4 flex justify-center items-center bg-[#13131a]">
        <img
          src={image}
          alt="fund"
          className="w-4/5 h-4/5 object-cover rounded-[8px]"
        />
      </div>

      <div className="flex flex-col p-4">
        {/* <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p>
        </div> */}

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4
              className={`font-epilogue font-semibold text-[14px] leading-[22px] ${
                amountCollected === target ? "text-white" : "text-[#b2b3bd]"
              }`}
            >
              {amountCollected === target ? "Funds Raised" : amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {amountCollected === target
                ? "Thank You"
                : `Raised of ${target} MATIC`}
              {/* Raised of {target} MATIC */}
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays < 0 ? "Ended On" : remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {remainingDays < 0 ? endDate : "Days Left"}
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
