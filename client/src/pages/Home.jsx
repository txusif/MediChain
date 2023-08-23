import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { CustomButton } from "../components";

const Home = () => {
  const {
    address,
    contract,
    getUserReports,
    getDetailedReport,
    getDoctors,
    getLabs,
    isDoctor,
    isLab,
    getAuthorisedDetails,
  } = useStateContext();

  const fetch = async () => {
    // // Fetching all reports of an user
    // const report = await getUserReports(address);
    // console.log(report);
    // // Fetching a sigle detaled report of an user
    // const detailedReport = await getDetailedReport(report[0]);
    // console.log(detailedReport);
    // // Formating Report upload date
    // function formatDate(date) {
    //   const options = {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric",
    //   };
    //   return date.toLocaleString("en-US", options);
    // }
    // const formattedDate = formatDate(new Date(detailedReport.date * 1000));
    // console.log(formattedDate);
    // // Fetching the list of Doctors
    const doctors = await getDoctors();
    // // doctors.map((doctor) => console.log(doctor));
    console.log("Doctors :");
    console.log(doctors);
    // // Fetching the list of Labs
    const labs = await getLabs();
    // // labs.map((lab) => console.log(lab));
    console.log("Labs :");
    console.log(labs);
    // // Check if the user is Doctor
    // const isAuthorisedDoctor = await isDoctor(address);
    // console.log("Doctor: " + isAuthorisedDoctor);
    // // Check if the user is Lab
    // const isAuthorisedLab = await isLab(address);
    // console.log("Lab: " + isAuthorisedLab);
    // Fetching doctors and labs details
    // const authorisedDetails = await getAuthorisedDetails(address);
    // console.log(authorisedDetails);
  };

  const handleFetch = () => {
    // console.log("address: ", address);
    if (contract) fetch();
  };

  return (
    <div className="font-epilogue font-semibold text-[16px] text-white">
      <CustomButton
        btnType="button"
        title="Fetch"
        styles="bg-[#1dc071] mb-[40px]"
        handleClick={handleFetch}
        isConnected={address}
      />
    </div>
  );
};

export default Home;
