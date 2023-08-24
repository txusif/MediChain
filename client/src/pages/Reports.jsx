import React, { useState } from "react";
import { useStateContext } from "../context";
import { CustomButton } from "../components";

const Reports = () => {
  const { address, contract, getUserReports, getDetailedReport } =
    useStateContext();
  const [contentId, setContentId] = useState([]);
  const fileURI = `https://gateway.pinata.cloud/ipfs/`;

  const fetch = async () => {
    const userReports = await getUserReports(address);
    // const detailedReport = await getDetailedReport(userReports[0]);
    // const detailedReport1 = await getDetailedReport(userReports[1]);
    console.log("User Reports");
    console.log(userReports);
    // console.log("Detailed Reports");
    // console.log(detailedReport);
    // console.log(detailedReport1);
    // setContentId((prev) => [...prev, detailedReport]);
    // setContentId((prev) => [...prev, detailedReport1]);

    for (let i = 0; i < userReports.length; i++) {
      const detailedReport = await getDetailedReport(userReports[i]);
      setContentId((prev) => [...prev, detailedReport]);
    }
  };

  const handleFetch = () => {
    if (contract) fetch();
  };
  return (
    <div className="font-epilogue font-semibold text-[16px] text-white">
      <CustomButton
        btnType="button"
        title="Get Reports"
        styles="bg-[#1dc071] mb-[40px]"
        handleClick={handleFetch}
        isConnected={address}
      />
      {contentId && (
        <div className="flex justify-center items-center">
          {/* <p className="">{contentId.category}</p> */}

          <div className="flex flex-col">
            {contentId.map((content) => (
              <a
                key={content.fileHash}
                href={fileURI + content.fileHash}
                target="_blank"
                className="p-4 mb-4 rounded-[10px] text-center bg-[#1dc071]"
              >
                <span className="text-red-600 uppercase pr-4">
                  {content.category} 👉
                </span>
                View Report
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
