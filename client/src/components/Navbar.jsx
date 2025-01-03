import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ConnectMetamask } from "../components";
import { logo, menu, profile } from "../assets";
import { navlinks } from "../constants";
import { Icon } from "../components";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Home");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <Link to="/">
        <div className="lg:flex-1 flex flex-row max-w-[250px] py-2 pl-10 pr-9 h-[52px] bg-[#1c1c24] rounded-bl-[20px] rounded-tl-[50px] rounded-br-[50px] rounded-tr-[20px] utline-none focus:ring ring-offset-2 focus:ring-[#1dc071]">
          <h1 className="font-epilogue tracking-wider flex font-bold text-[#1dc071] m-auto text-[26px] items-center o">
            MediChain
          </h1>
        </div>
      </Link>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <ConnectMetamask />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#1c1c24] flex justify-center items-center cursor-pointer">
            <img
              src={profile}
              alt="user"
              className="w-[60%] h-[60%] object-contain grayscale"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <Link to="/">
            {/* <img
              src={logo}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            /> */}
            <Icon
              styles="w-[52px] h-[52px] bg-[#2c2f32]"
              imgUrl={logo}
              handleClick={() => {
                setIsActive("Home");
              }}
            />
          </Link>
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] rounded-[8px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary rounded-[8px] bg-whi py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain cursor-pointer ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] pt-[2px] font-epilogue font-semibold text-[14px] cursor-pointer ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div id="metamask" className="flex mx-4">
            <ConnectMetamask />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
