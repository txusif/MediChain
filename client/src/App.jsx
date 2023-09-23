import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStateContext } from "./context";

import { Navbar, Sidebar } from "./components";
import {
  Home,
  Register,
  UploadReports,
  Reports,
  Profile,
  CreateCampaign,
  Campaigns,
  CampaignDetails,
} from "./pages";

function App() {
  const {
    address,
    contract,
    getDoctors,
    getLabs,
    isDoctor,
    isLab,
    getAuthorisedDetails,
  } = useStateContext();

  // const [doctors, setDoctors] = useState([]);
  // const [labs, setLabs] = useState([]);
  // const [isAuthorisedDoctor, setisAuthorisedDoctor] = useState(false);
  // const [isAuthorisedLab, setisAuthorisedLab] = useState(false);

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
    // const doctorss = await getDoctors();
    // setDoctors(doctorss);
    // // doctors.map((doctor) => console.log(doctor));
    // console.log("Doctors :");
    // console.log(doctors);
    // // Fetching the list of Labs
    // const labss = await getLabs();
    // setLabs(labss);
    // // labs.map((lab) => console.log(lab));
    // console.log("Labs :");
    // console.log(labss);
    // // Check if the user is Doctor
    // const isAuthDoctor = await isDoctor(address);
    // if (isAuthDoctor) setisAuthorisedDoctor(true);
    // console.log("Doctor: " + isAuthDoctor);
    // // Check if the user is Lab
    // const isAuthLab = await isLab(address);
    // if (isAuthLab) setisAuthorisedLab(true);
    // console.log("Lab: " + isAuthLab);
    // Fetching doctors and labs details
    // const authorisedDetails = await getAuthorisedDetails(address);
    // console.log(authorisedDetails);
  };

  useEffect(() => {
    if (contract) fetch();
  }, [address, contract]);

  return (
    <div className="relaive sm:8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload-reports" element={<UploadReports />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
