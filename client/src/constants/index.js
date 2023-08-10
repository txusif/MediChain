import {
  home,
  register,
  uploadReports,
  reports,
  createCampaign,
  campaigns,
  profile,
} from "../assets";

export const navlinks = [
  {
    name: "Home",
    imgUrl: home,
    link: "/",
  },
  {
    name: "Register",
    imgUrl: register,
    link: "/register",
  },
  {
    name: "Upload Reports",
    imgUrl: uploadReports,
    link: "/upload-reports",
  },
  {
    name: "Reports",
    imgUrl: reports,
    link: "/reports",
  },
  {
    name: "Create Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "Campaigns",
    imgUrl: campaigns,
    link: "/campaigns",
  },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/profile",
  },
];
