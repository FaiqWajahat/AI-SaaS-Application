import { AiToolsData } from "../assets/assets"
import { useNavigate } from "react-router-dom";

const AiTools = () => {

  const navigate = useNavigate();
  return (
   <>
   
   <div className="px-4 sm:px-20 xl:px-32 my-24 ">
    <div className="text-center">
        <h2 className="text-slate-700 text-[42px] mx-auto font-semibold"> Powerful AI</h2>
        <p className="text-gray-600 max-w-lg mx-auto trackin    g-tighter md:tracking-normal  ">Everything you need to create, enhance and optimize your content with cutting-edge AI technology.</p>
    </div>
    <div className="flex mt-8 justify-center flex-wrap gap-8">
        {
            AiToolsData.map((tool, index) => (
                <div onClick={()=>navigate(`${tool.path}`)} key={index} className="w-[350px] h-[250px] md:w-xl lg:w-[350px] bg-white rounded-lg shadow-md p-6 flex flex-col items-start justify-between hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                     
                   <div
                     className="w-14 h-12 flex items-center justify-center rounded-xl"
                     style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
                   >
                     {<tool.Icon className="w-8 h-8 text-white" />}
                   </div>
                    <h3 className="text-lg font-semibold text-gray-800">{tool.title}</h3>
                    <p className="text-gray-600 text-start">{tool.description}</p> 
                    
                </div>
            ))

        }
    </div>
   </div>
   </>
  )
}

export default AiTools