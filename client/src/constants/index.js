import {
  home,
  register,
  uploadReports,
  searchReport,
  reports,
  createCampaign,
  campaigns,
  profile,
  storingDocument,
  vault,
  peoplesStanding,
  ewallet,
} from "../assets";

import {
  faInstagram,
  faXTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

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
    name: "Search Report",
    imgUrl: searchReport,
    link: "/search-report",
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

export const features = [
  {
    title: "Secure Medical Records",
    imgUrl: storingDocument,
    altTag: "storeDocuments",
    description:
      "At 'MediChain,' we prioritize the security and privacy of your medical records. Our blockchain technology ensures that your health data remains safe from unauthorized access and tampering.",
    buttonTitle: "Try it",
    link: "/reports",
    name: "Reports",
  },
  {
    title: "IPFS Integration",
    imgUrl: vault,
    altTag: "ipfs",
    description:
      "Our partnership with IPFS, powered by Pinata, offers decentralized and secure storage for your critical medical files. Rest assured, your healthcare data is in trustworthy hands.",
    buttonTitle: "Checkout",
    link: "/search-report",
    name: "Search Report",
  },
  {
    title: "Blockchain Connectivity",
    imgUrl: ewallet,
    altTag: "metamask",
    description:
      "Seamlessly interact with the Ethereum blockchain through Metamask Wallet. You have complete control over your data, with transparency and trust at the core of our Dapp.",
    buttonTitle: "Connect Wallet",
    link: "connectMetamask",
    name: "Home",
  },
  {
    title: "Crowdfunding Mechanism",
    imgUrl: peoplesStanding,
    altTag: "crowdFunding",
    description:
      "We empower patients to create campaigns and seek financial support from a global community. 'MediChain' bridges the gap between healthcare seekers and compassionate contributors.",
    buttonTitle: "Create a campaign",
    link: "/create-campaign",
    name: "Campaigns",
  },
];

export const socialLinks = [
  {
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/txusif",
  },
  {
    icon: faGithub,
    link: "http://github.com/txusif",
  },
  {
    icon: faLink,
    link: "https://linktr.ee/txusif",
  },
  {
    icon: faXTwitter,
    link: "https://x.com/txusiff",
  },
  {
    icon: faInstagram,
    link: "https://instagram.com/txusif",
  },
];
