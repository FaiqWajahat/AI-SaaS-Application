import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      {/* Footer Enhancement: Use semantic HTML, fix classNameName, add accessibility, and improve structure */}
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div className="md:max-w-96">
            <img className="h-9" alt="" src={assets.logo} />
            <p className="mt-6 text-sm">
              Experience the power of AI with QuickAi.
              <br />
              Transform your content creation with our suite of premium AI
              tools. Write articles, generate images, and enhance your workflow.
            </p>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-10 sm:gap-20">
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 mb-5">
                Subscribe to our newsletter
              </h2>
              <div className="text-sm space-y-2">
                <p>
                  The latest news, articles, and resources, sent to your inbox
                  weekly.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    className="border border-gray-500/30 placeholder-gray-500 outline-none w-full min-w-28 max-w-64 h-9 rounded px-2"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button className="bg-[#5044E5] cursor-pointer hover:-translate-y-[1.2px] transition-all duration-300 px-4 h-9 text-white rounded">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2025 © QuickAi. All Right Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
