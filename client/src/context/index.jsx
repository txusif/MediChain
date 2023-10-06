import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xd53577142439A8BCC22Ef37aaE34072264B77675"
  );

  const address = useAddress();
  const connect = useMetamask();

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.fileHash,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      console.log("contract call successs", data);
    } catch (error) {
      console.error("contract call failure", err);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    // console.log(campaigns);

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      fileHash: campaign.fileHash,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async (address) => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    console.log(filteredCampaigns);
    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const register = async (name, id, applyId) => {
    try {
      console.log(name, id, applyId);
      const data = await contract.call("checkAuthorisation", [
        name,
        id,
        applyId,
      ]);
      console.log("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const saveReport = async ({
    fileHash,
    category,
    userAddress,
    generalInfo,
  }) => {
    try {
      console.log(fileHash, category, userAddress, generalInfo);

      const data = await contract.call("SaveReport", [
        fileHash,
        category,
        userAddress,
        generalInfo,
      ]);
      console.log("contract call successs", data);
    } catch (err) {
      console.log("contract call failure", err);
    }
  };

  const getUserReports = async (userAddress) => {
    const reports = await contract.call("getUserReports", [userAddress]);
    return reports;
  };

  const getDetailedReport = async (fileHash) => {
    const detailedReport = await contract.call("GetDetailedReport", [fileHash]);
    // console.log(detailedReport);

    const parsedDetailedReport = {
      fileHash: detailedReport.fileHash,
      category: detailedReport.category,
      userAddress: detailedReport.user,
      lab: detailedReport.byLab,
      date: detailedReport.dated.toNumber(),
      // target: ethers.utils.formatEther(detailedReport.target.toString()),
      age: detailedReport.generalInfo.age.toNumber(),
      height: detailedReport.generalInfo.height.toNumber(),
      weight: detailedReport.generalInfo.weight.toNumber(),
      gender: detailedReport.generalInfo.gender,
      bloodGroup: detailedReport.generalInfo.bloodGroup,
    };
    // console.log(parsedDetailedReport);
    return parsedDetailedReport;
  };

  const getDoctors = async () => {
    const doctors = await contract.call("GetAllDoctors");
    return doctors;
  };

  const getLabs = async () => {
    const Labs = await contract.call("GetAllLabs");
    return Labs;
  };

  const isDoctor = async (address) => {
    const isDoc = await contract.call("AuthorisedDoc", [address]);
    return isDoc;
  };

  const isLab = async (address) => {
    const isLab = await contract.call("AuthorisedLab", [address]);
    return isLab;
  };

  const getAuthorisedDetails = async (address) => {
    const authorisedDetails = await contract.call("GetAuthDetails", [address]);
    return authorisedDetails;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        register,
        saveReport,
        getUserReports,
        getDetailedReport,
        getDoctors,
        getLabs,
        isDoctor,
        isLab,
        getAuthorisedDetails,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
