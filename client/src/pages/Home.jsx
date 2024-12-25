import { Feature, Socials } from "../components";
import { features, socialLinks } from "../constants";

const Home = ({ setIsActive }) => {
  setIsActive("Home");
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#1c1c24] flex flex-col justify-center items-center rounded-[10px]">
      <div className="font-epilogue font-semibold text-center">
        <h1 className="sm:text-6xl text-3xl text-white sm:mt-[60px] mt-[50px] tracking-wider uppercase">
          MediChain
        </h1>
        <p className="sm:text-xl text-xs text-[#818183] tracking-wider ">
          Your Gateway to Secure Healthcare Solutions.
        </p>
      </div>

      {features.map((feature, index) => (
        <Feature
          key={index}
          title={feature.title}
          imgUrl={feature.imgUrl}
          altTag={feature.altTag}
          description={feature.description}
          buttonTitle={feature.buttonTitle}
          link={feature.link}
        />
      ))}

      <footer className="mt-[50px]">
        <div className="flex flex-row justify-center gap-5 ">
          {socialLinks.map((social, index) => (
            <Socials key={index} icon={social.icon} link={social.link} />
          ))}
        </div>
        <p className="font-epilogue font-normal max-sm:text-sm text-[#818183] mt-[12px] mb-[15px]">
          &copy; {year} | txusif | All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;
