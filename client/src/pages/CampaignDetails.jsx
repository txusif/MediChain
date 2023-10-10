import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader, CopyContent } from "../components";
import { calculateBarPercentage, daysLeft, CampaignEndDate } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, address, contract, getUserCampaigns } =
    useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [noOfCampaigns, setNoOfCampaigns] = useState(0);
  const remainingDays = daysLeft(state.deadline);
  const endDate = CampaignEndDate(state.deadline);

  const fetchDonators = async () => {
    // setIsLoading(true);
    const allCampaigns = await getUserCampaigns(state.owner);
    setNoOfCampaigns(allCampaigns.length);
    const data = await getDonations(state.pId);
    setDonators(data);
    // setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [address, contract]);

  const handleDonate = async () => {
    if (amount) {
      console.log(amount);
      setIsLoading(true);
      await donate(state.pId, amount);
      toast.success("Successful");
      navigate("/campaigns");
      setIsLoading(false);
    }
  };

  const funded = state.amountCollected === state.target;
  const fileURI = `https://gateway.pinata.cloud/ipfs/`;

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[10px] bg-[#3a3a43] mt-2 rounded-[10px]">
            <div
              className={`absolute h-full bg-[#4acd8d] ${
                state.amountCollected === state.target
                  ? "rounded-[10px]"
                  : "rounded-l-[10px]"
              }`}
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-row md:flex-col justify-between gap-[5px]">
          <CountBox
            title={remainingDays <= 0 ? endDate : "Days Left"}
            value={remainingDays <= 0 ? "Ended On" : remainingDays}
            daysLeft={remainingDays}
          />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="flex mt-[60px] lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[30px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] flex flex-row items-center justify-center rounded-full bg-[#2c2f32]">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>

              <div>
                <div className="flex flex-row gap-[5px]">
                  <h4 className="font-epilogue font-semibold leading-7 text-white text-[11px] sm:text-[14px] break-all">
                    {state.owner}
                  </h4>
                  <CopyContent textToBeCopied={state.owner} />
                </div>
                <p className="mt-[3px] font-epilogue font-normal text-[#808191] text-[12px]">
                  {noOfCampaigns <= 1
                    ? `${noOfCampaigns} Campaign`
                    : `${noOfCampaigns} Campaigns`}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[#808191] text-[16px] leading-[26px] text-justify break-words">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex max-sm:flex-col justify-between sm:items-center sm:gap-4"
                  >
                    <div className="flex flex-row gap-[5px]">
                      <p className="font-epilogue font-normal text-[13px] sm:text-[16px] text-[#b2b3bd] leading-[30px] break-all">
                        {index + 1}. {item.donator}
                      </p>
                      <CopyContent textToBeCopied={item.donator} />
                    </div>

                    <p className="font-epilogue font-normal text-[13px] sm:text-[16px] text-[#808191] leading-[26px] break-all max-sm:ml-[13px]">
                      {item.donation} MATIC
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[#808191] text-[16px] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="block mt-1 sm:mr-[250px] mr-[130px]">
            <a
              href={fileURI + state.fileHash}
              target="_blank"
              className="flex justify-center items-center font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[35px] px-4 py-2 rounded-[6px] outline-none focus:ring ring-offset-2 focus:ring-[#1dc071] bg-[#1dc071]"
            >
              View Document
            </a>
          </div>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              {state.amountCollected === state.target && (
                <>
                  <CustomButton
                    btnType="button"
                    title="Fund Raised"
                    styles="w-full bg-[#1dc071] mb-[8px] focus:ring-[#8c6dfd]"
                    handleClick={handleDonate}
                    isConnected={false}
                  />
                </>
              )}

              {state.amountCollected !== state.target && (
                <>
                  <input
                    type="number"
                    placeholder="10 MATIC"
                    step="1"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white rounded-[10px] text-[18px] leading-[30px] placeholder:text-[#4b5264]"
                    value={amount}
                    max={state.target - state.amountCollected}
                    min="0"
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  <CustomButton
                    btnType="button"
                    title={"Fund the campaign"}
                    styles="w-full bg-[#8c6dfd] mt-[20px] mb-[8px] focus:ring-[#8c6dfd]"
                    handleClick={handleDonate}
                    isConnected={
                      address &&
                      address !== state.owner &&
                      amount <= state.target - state.amountCollected
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
