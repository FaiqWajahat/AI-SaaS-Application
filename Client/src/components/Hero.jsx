import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const naviagte = useNavigate();
  return (
    <>
      <div className="px-4  sm:px-20 xl:px-32 relative inline-flex flex-col items-center justify-center w-full min-h-screen bg-[url(/gradientBackground.png)] bg-cover bg-center bg-no-repeat">
        <div className="mb-6 mt-20 text-center">
          {/* Hero section Heading defined here */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl  2xl:text-7xl 
              font-semibold mx-auto leading-[1.2]"
          >
            Create amazing content <br /> with{" "}
            <span className="text-[#5044E5]">AI tools</span>
          </h1>

          {/* Hero section Subheading defined here */}
          <p className="mt-4 max-w-xs md:max-w-xl 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, remove backgrounds, and more with
            ease.
          </p>

          {/* Buttons group is defined here  */}
          <div className="mt-8 flex items-center gap-2 md:gap-4 justify-center ">
            <button
              onClick={() => naviagte("/ai")}
              className="bg-[#5044E5] text-white px-4 py-3 md:px-8  rounded-md text-sm md:font-medium font-normal hover:scale-[1.02] transition-all cursor-pointer"
            >
              Start creating now
            </button>
            <button className="border border-gray-200 px-6 md:px-10 py-3 rounded-md text-sm font-medium bg-white text-black   hover:scale-[1.02] transition-all cursor-pointer shadow-xs">
              Watch demo
            </button>
          </div>

          {/* trusted people defined here  */}
          <div className="flex justify-center items-center mt-8 gap-4 text-gray-600">
            <img src={assets.user_group} alt="trusted people" className="h-8" />
            <span>Trusted by 10k+ people</span>
          </div>
        </div>
        

        <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none mt-20">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#ffffff] to-transparent"></div>
          <div
            className="marquee-inner flex will-change-transform min-w-[200%]"
            style={{ animation: "marquee 30s linear infinite" }}
          >
            <div className="flex">
              <img alt="slack" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg" />
              <img alt="framer" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg" />
              <img alt="netflix" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg" />
              <img alt="google" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg" />
              <img alt="linkedin" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg" />
              <img alt="instagram" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg" />
              <img alt="facebook" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg" />
              <img alt="slack" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg" />
              <img alt="framer" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg" />
              <img alt="netflix" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg" />
              <img alt="google" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg" />
              <img alt="linkedin" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg" />
              <img alt="instagram" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg" />
              <img alt="facebook" className="w-full h-full object-cover mx-6" draggable="false" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg" />
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#ffffff] to-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;

