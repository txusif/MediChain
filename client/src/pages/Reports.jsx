import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { CustomButton, DisplayReports } from "../components";

const Reports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getUserReports, getDetailedReport } =
    useStateContext();
  const [contentId, setContentId] = useState([]);
  const fileURI = `https://gateway.pinata.cloud/ipfs/`;

  const fetch = async () => {
    setIsLoading(true);

    const userReports = await getUserReports(address);
    // const detailedReport = await getDetailedReport(userReports[0]);
    // const detailedReport1 = await getDetailedReport(userReports[1]);
    // console.log("User Reports");
    // console.log(userReports);
    // console.log("Detailed Reports");
    // console.log(detailedReport);
    // console.log(detailedReport1);
    // setContentId((prev) => [...prev, detailedReport]);
    // setContentId((prev) => [...prev, detailedReport1]);

    for (let i = 0; i < userReports.length; i++) {
      const detailedReport = await getDetailedReport(userReports[i]);
      console.log(detailedReport);
      setContentId((prev) => [...prev, detailedReport]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetch();
  }, [address, contract]);

  return (
    <div>
      {/* {contentId[0].fileHash}
      {contentId[1].fileHash} */}

      <DisplayReports
        title="Your Reports"
        isLoading={isLoading}
        reports={contentId}
      />
    </div>
  );
};

export default Reports;
