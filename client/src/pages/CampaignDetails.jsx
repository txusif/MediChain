import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader, CopyContent } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { campaigns, thirdweb } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, address, contract } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async (pId) => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [address, contract]);

  const handleDonate = async () => {
    if (amount) {
      console.log(amount);
      setIsLoading(true);
      await donate(state.pId, amount);
      navigate("/campaigns");
      setIsLoading(false);
    }
  };

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

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
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
              <div className="sm:w-[52px] sm:h-[52px] w-[48px] h-[48px] flex flex-row items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>

              <div>
                <div className="flex flex-row gap-[10px]">
                  <h4 className="font-epilogue font-semibold leading-7 text-white text-[11.5px] sm:text-[14px] break-all">
                    {state.owner}
                  </h4>
                  <CopyContent textToBeCopied={state.owner} />
                </div>
                <p className="mt-[4px] font-epilogue font-normal text-[#808191] text-[12px]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[#808191] text-[16px] leading-[26px] text-justify">
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
                    className="flex justify-between items-center gap-4"
                  >
                    <div className="flex flex-row gap-[10px]">
                      <p className="font-epilogue font-normal text-[11.5px] sm:text-[16px] text-[#b2b3bd] leading-[30px] break-all">
                        {index + 1}. {item.donator}
                      </p>
                      <CopyContent textToBeCopied={state.owner} />
                    </div>

                    <p className="font-epilogue font-normal text-[11.5px] sm:text-[16px] text-[#808191] leading-[26px] break-all">
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
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="10 MATIC"
                step="1"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white rounded-[10px] text-[18px] leading-[30px] placeholder:text-[#4b5264]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {/* <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you .
                </p>
              </div> */}

              <CustomButton
                btnType="button"
                title="Fund the campaign"
                styles="w-full bg-[#8c6dfd] mt-[20px] mb-[8px]"
                handleClick={handleDonate}
                isConnected={address && address !== state.owner}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
