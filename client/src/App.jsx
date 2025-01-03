import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStateContext } from "./context";
import { Toaster } from "react-hot-toast";

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
  const { address, contract, isDoctor, isLab } = useStateContext();
  const [isActive, setIsActive] = useState("Home");
  const [isAuthorisedDoctor, setIsAuthorisedDoctor] = useState(false);
  const [isAuthorisedLab, setIsAuthorisedLab] = useState(false);

  const handleActive = (page) => {
    setIsActive(page);
  };

  const fetch = async () => {
    const isAuthDoctor = await isDoctor(address);
    setIsAuthorisedDoctor(isAuthDoctor);
    console.log("Doctor: " + isAuthDoctor);

    const isAuthLab = await isLab(address);
    setIsAuthorisedLab(isAuthLab);
    console.log("Lab: " + isAuthLab);
  };

  useEffect(() => {
    if (contract) fetch();
  }, [address, contract]);

  return (
    <div className="relaive sm:8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar isActive={isActive} setIsActive={handleActive} />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1c1c24",
            color: "#fff",
          },
          success: {
            duration: 2000,
          },
        }}
      />
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home setIsActive={handleActive} />} />
          <Route
            path="/register"
            element={
              <Register
                setIsActive={handleActive}
                isAuthorisedLab={isAuthorisedLab}
                isAuthorisedDoctor={isAuthorisedDoctor}
              />
            }
          />
          <Route
            path="/upload-reports"
            element={<UploadReports setIsActive={handleActive} />}
          />
          <Route
            path="/reports"
            element={<Reports setIsActive={handleActive} />}
          />
          <Route
            path="/search-report"
            element={
              <SearchReport
                setIsActive={handleActive}
                isAuthorisedLab={isAuthorisedLab}
                isAuthorisedDoctor={isAuthorisedDoctor}
              />
            }
          />
          <Route
            path="/create-campaign"
            element={<CreateCampaign setIsActive={handleActive} />}
          />
          <Route
            path="/campaigns"
            element={<Campaigns setIsActive={handleActive} />}
          />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route
            path="/profile"
            element={<Profile setIsActive={handleActive} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
