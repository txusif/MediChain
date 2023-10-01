import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles, isConnected }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white outline-none min-h-[52px] px-4 rounded-[10px] focus:ring ring-offset-2 focus:ring-[#1dc071] ${styles}`}
      onClick={handleClick}
      disabled={!isConnected}
    >
      {title}
    </button>
  );
};

export default CustomButton;
