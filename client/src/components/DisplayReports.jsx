import React from "react";
import { loader } from "../assets";
import ReportCard from "./ReportCard";

const DisplayReports = ({ title, isLoading, reports, titleSize }) => {
  return (
    <div>
      <h1
        className={`font-epilogue text-center sm:text-left font-bold text-[18px] text-white ${titleSize} `}
      >
        {title} ({reports.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loading"
            className="w-full h-[100px] object-contain"
          />
        )}

        {!isLoading && reports.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] m-auto sm:m-0 leading-[30px] text-[#818183] text-left">
            You do not have any reports yet.
          </p>
        )}

        {!isLoading &&
          reports.length > 0 &&
          reports.map((report) => (
            <ReportCard key={report.fileHash} {...report} />
          ))}
      </div>
    </div>
  );
};

export default DisplayReports;
