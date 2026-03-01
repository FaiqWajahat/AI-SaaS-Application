import {   Protect, useClerk, useUser } from "@clerk/clerk-react";
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from "lucide-react";
import { NavLink } from "react-router-dom";


const Sidebar = ({sideBar}) => {
  
    const {signOut}=useClerk()
    
    const linksData = [
        { to: "/ai", name: "Dashboard", Icon: House },
        { to: "/ai/write-article", name: "Write Article", Icon: SquarePen },
        { to: "/ai/blog-title", name: "Blog Title", Icon: Hash },
        { to: "/ai/generate-images", name: "Generate Images", Icon: Image},
        { to: "/ai/remove-background", name: "Remove Background", Icon: Eraser },
        { to: "/ai/remove-object", name: "Remove Object", Icon:Scissors },
        { to: "/ai/review-resume", name: "Review Resume", Icon: FileText },
        { to: "/ai/community", name: "Community", Icon: Users }
    ];
    
  
  const {user}=useUser()
  console.log(user)
  const URL=user?.imageUrl
// Responsive sidebar: 
// - On md+ screens: sidebar is visible (translate-x-0) when sideBar is false, hidden (-translate-x-full) when true
// - On small screens: sidebar is hidden (-translate-x-full) when sideBar is false, visible (translate-x-0) when true
const sidebarClass = `
    h-full py-4 px-4 bg-white border-r border-gray-200 flex flex-col justify-between w-60 z-50
    transition-transform duration-300
    ${
        // Small screens
        sideBar
            ? "translate-x-0"
            : "-translate-x-full"
    }
    ${
        // md+ screens
        sideBar
            ? "md:-translate-x-full"
            : "md:translate-x-0"
    }
    ${
        // Positioning
        "fixed md:relative left-0 top-0"
    }
`;

return (
    <>
        <div className={sidebarClass}>
            <div className="mx-auto w-full">
                <img src={URL} alt="profile Avatar" className="h-12 w-12 rounded-full mx-auto cursor-pointer" />
                <h3 className="text-black text-lg text-center mt-2 mb-6">{user?.fullName}</h3>
                {
                    linksData.map(({ to, name, Icon }) => (
                        <NavLink
                            to={to}
                            end={to === "/ai"}
                            className={({ isActive }) =>
                                `font-light w-full ${
                                    isActive
                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                        : ""
                                }`
                            }
                            key={to}
                        >
                            {({ isActive }) => (
                                <div
                                    className={`flex items-center gap-3 w-full px-4 rounded-md py-2 text-sm mb-1 hover:bg-gray-100 ${
                                        isActive
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                            : "text-slate-600"
                                    }`}
                                >
                                    <Icon className="h-4 w-4 font-medium" />
                                    <span className="font-medium">{name}</span>
                                </div>
                            )}
                        </NavLink>
                    ))
                }
            </div>

            <div className="pt-4 border-t border-gray-200 mt-6 flex justify-between items-center w-full">
                <div className="flex items-center gap-2 ">
                    <img src={URL} alt="profile Avatar" className="h-8 w-8 rounded-full mx-auto cursor-pointer" />
                    <div className="gap-y-0">
                        <h4 className="">{user?.fullName || 'John Doe'}</h4>
                        <h5 className="text-xs text-gray-600 ">
                            <Protect plan='premium' fallback='Free'>
                                Premium
                            </Protect>
                        </h5>
                    </div>
                </div>
                <LogOut onClick={signOut} className="text-gray-400 h-5 w-5 cursor-pointer" />
            </div>
        </div>
    </>
);
};

export default Sidebar;
