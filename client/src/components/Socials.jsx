import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Socials = ({ link, icon }) => {
  return (
    <a href={link} target="_blank">
      <FontAwesomeIcon
        icon={icon}
        className="text-white text-[1.3rem] hover:text-[1.5rem]"
      />
    </a>
  );
};

export default Socials;
