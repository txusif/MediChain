import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useStateContext } from "./context";

import { Navbar, Sidebar } from "./components";
import {
  Home,
  Register,
  UploadReports,
  Reports,
  SearchReport,
  Profile,
  CreateCampaign,
  Campaigns,
  CampaignDetails,
} from "./pages";

function App() {
  const { address, contract } = useStateContext();
  const [isActive, setIsActive] = useState("Home");
  const handleActive = (page) => {
    setIsActive(page);
  };

  return (
    <div className="relaive sm:8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar isActive={isActive} setIsActive={handleActive} />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home setIsActive={handleActive} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload-reports" element={<UploadReports />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/search-report" element={<SearchReport />} />
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
