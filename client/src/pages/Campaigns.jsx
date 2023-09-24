import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { daysLeft } from "../utils";

const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    console.log(data);
    setCampaigns(data);
    setIsLoading(false);
  };

  // console.log(daysLeft(campaigns[0].deadline));
  const validCampaigns = campaigns.filter(
    (campaign) => daysLeft(campaign.deadline) >= 0
  );
  // console.log(validCampaigns);

  useEffect(() => {
    // console.log("contract:", contract);
    // console.log("address: ", address);
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <DisplayCampaigns
        title="All campaigns"
        isLoading={isLoading}
        // campaigns={campaigns}
        campaigns={validCampaigns}
      />
    </div>
  );
};

export default Campaigns;
