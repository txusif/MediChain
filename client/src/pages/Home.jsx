import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

const Home = () => {
  // const {
  //   address,
  //   contract,
  //   getUserReports,
  //   getDetailedReport,
  //   getDoctors,
  //   getLabs,
  //   isDoctor,
  //   isLab,
  //   getAuthorisedDetails,
  // } = useStateContext();

  // const [doctors, setDoctors] = useState([]);
  // const [labs, setLabs] = useState([]);

  // const fetch = async () => {
  //   // // Fetching all reports of an user
  //   // const report = await getUserReports(address);
  //   // console.log(report);
  //   // // Fetching a sigle detaled report of an user
  //   // const detailedReport = await getDetailedReport(report[0]);
  //   // console.log(detailedReport);
  //   // // Formating Report upload date
  //   // function formatDate(date) {
  //   //   const options = {
  //   //     hour: "2-digit",
  //   //     minute: "2-digit",
  //   //     day: "numeric",
  //   //     month: "long",
  //   //     year: "numeric",
  //   //   };
  //   //   return date.toLocaleString("en-US", options);
  //   // }
  //   // const formattedDate = formatDate(new Date(detailedReport.date * 1000));
  //   // console.log(formattedDate);
  //   // // Fetching the list of Doctors
  //   const doctorss = await getDoctors();
  //   setDoctors(doctorss);
  //   // // doctors.map((doctor) => console.log(doctor));
  //   console.log("Doctors :");
  //   // console.log(doctors);
  //   // // Fetching the list of Labs
  //   const labss = await getLabs();
  //   setLabs(labss);
  //   // // labs.map((lab) => console.log(lab));
  //   console.log("Labs :");
  //   // console.log(labss);
  //   // // Check if the user is Doctor
  //   // const isAuthorisedDoctor = await isDoctor(address);
  //   // console.log("Doctor: " + isAuthorisedDoctor);
  //   // // Check if the user is Lab
  //   // const isAuthorisedLab = await isLab(address);
  //   // console.log("Lab: " + isAuthorisedLab);
  //   // Fetching doctors and labs details
  //   // const authorisedDetails = await getAuthorisedDetails(address);
  //   // console.log(authorisedDetails);
  // };

  // useEffect(() => {
  //   if (contract) fetch();
  // }, [address, contract]);

  return (
    <div className="font-epilogue font-semibold text-[16px] text-white">
      Home Page
    </div>
  );
};

export default Home;
