import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayReports } from "../components";
import { search } from "../assets";

const SearchReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getUserReports, getDetailedReport } =
    useStateContext();
  const [contentId, setContentId] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fetched, setFetched] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setContentId([]);
    setFetched(false);
  };

  const fetch = async () => {
    setFetched(false);
    setIsLoading(true);

    const userReports = await getUserReports(inputValue);
    for (let i = 0; i < userReports.length; i++) {
      const detailedReport = await getDetailedReport(userReports[i]);
      console.log(detailedReport);
      setContentId((prev) => [...prev, detailedReport]);
    }
    setIsLoading(false);
    setFetched(true);
  };

  const handleClick = () => {
    setContentId([]);
    if (contract && address) fetch();
  };

  return (
    <div>
      <h1 className="font-epilogue text-center sm:text-left font-bold text-[18px] text-white ">
        Search For Reports
      </h1>

      <div className="lg:flex-1 flex flex-row max-w-[435px] sm:max-w-[458px] py-2 pl-6 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] my-[20px] max-sm:mx-auto">
        <input
          type="text"
          placeholder="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
          className="flex w-full font-epilogue font-normal text-[13.5px] sm:text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          value={inputValue}
          onChange={handleInputChange}
        />

        <div
          className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      {inputValue.length === 42 && contentId.length > 0 && (
        <DisplayReports
          title={contentId.length === 1 ? "Report Found" : "Reports Found"}
          isLoading={isLoading}
          reports={contentId}
          titleSize="sm:text-[1rem] text-[0.8rem]"
        />
      )}

      {inputValue.length === 42 && contentId.length === 0 && fetched && (
        <h1 className="font-epilogue text-center sm:text-left font-bold sm:text-[1rem] text-[0.8rem] text-white ">
          No Reports Found
        </h1>
      )}
    </div>
  );
};

export default SearchReport;
