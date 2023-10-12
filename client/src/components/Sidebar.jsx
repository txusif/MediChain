import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { sidebarLogo } from "../assets";
import { navlinks } from "../constants";
import { Icon } from "../components";

const Sidebar = ({ isActive, setIsActive }) => {
  const navigate = useNavigate();
  // const [isActive, setIsActive] = useState("Home");
  // const [isDark, setIsDark] = useState(true);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[65vh]">
      <Link to="/">
        <Icon
          styles="w-[58px] h-[58px] bg-[#1c1c24] rounded-full"
          imgUrl={sidebarLogo}
          size="w-full h-full"
          handleClick={() => {
            setIsActive("Home");
          }}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-4">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
