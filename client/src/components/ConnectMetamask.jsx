import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const ConnectMetamask = () => {
  return (
    <ConnectWallet
      className="font-epilogue font-semibold text-[16px] min-h-[52px] px-4 rounded-[10px]"
      theme="dark"
      btnTitle="Connect Wallet"
      dropdownPosition={{
        side: "bottom",
        align: "center",
      }}
    />
  );
};

export default ConnectMetamask;
