import React from "react";

const CountBox = ({ title, value, daysLeft }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4
        className={`font-epilogue font-bold text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate ${
          daysLeft < 0 ? "text-[25px]" : "text-[30px]"
        }`}
      >
        {value}
      </h4>
      <p
        className={`font-epilogue font-normal text-[16px] text-[#808191] px-3 py-2 bg-[#28282e] rounded-b-[10px] w-full text-center truncate ${
          daysLeft < 0 && "font-semibold"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default CountBox;
