import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const Layout =  () => {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);

  const  {user}=  useUser()
useEffect(()=>{
if(!user){
  navigate("/");
}
},[user])
  console.log(user)
  return (
    <>
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
        {sideBar ? (
          <X
            onClick={() => setSideBar(!sideBar)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSideBar(!sideBar)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>

      <div className="block md:flex h-[calc(100vh-64px)] w-full  ">
        <Sidebar sideBar={sideBar} setSideBar={setSideBar}  />
        <div className="w-screen flex-1 h-full  bg-slate-100">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="md:h-12  h-6 w-full bg-white -z-20"></div>
    </>
  );
};

export default Layout;
