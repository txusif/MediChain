import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { CustomButton, DisplayReports } from "../components";

const Reports = ({ setIsActive }) => {
  setIsActive("Reports");
  const [isLoading, setIsLoading] = useState(false);
  const {
    address,
    contract,
    getUserReports,
    getDetailedReport,
    getAuthorisedDetails,
  } = useStateContext();
  const [contentId, setContentId] = useState([]);

  const fetch = async () => {
    setIsLoading(true);

    const userReports = await getUserReports(address);

    for (let i = 0; i < userReports.length; i++) {
      const detailedReport = await getDetailedReport(userReports[i]);
      console.log(detailedReport);
      setContentId((prev) => [...prev, detailedReport]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setContentId([]);
    if (contract && address) fetch();
  }, [address, contract]);

  return (
    <div>
      <DisplayReports
        title="Your Reports"
        isLoading={isLoading}
        reports={contentId.reverse()}
      />
    </div>
  );
};

export default Reports;
