import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun, moon } from "../assets";
import { navlinks } from "../constants";
import { Icon } from "../components";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Home");
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imgUrl={logo}
          handleClick={() => {
            setIsActive("Home");
          }}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
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

        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={isDark ? sun : moon}
          handleClick={() => {
            setIsDark((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
