import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = ({ setIsActive }) => {
  setIsActive("Profile");
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns(address);
    const dataOrdered = data.reverse();
    setCampaigns(dataOrdered);
    console.log(dataOrdered);
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log("contract:", contract);
    // console.log("address: ", address);
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Profile;
