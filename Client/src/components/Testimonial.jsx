import { Star } from "lucide-react"
import { dummyTestimonialData } from "../assets/assets"

const Testimonial = () => {
  return (
   <>
   <div className="px-4 sm:px-20 xl:px-32 my-24 ">
       <div className="text-center">
           <h2 className="text-slate-700 text-[42px] mx-auto font-semibold">Loved by Creators</h2>
            <p className="text-gray-600 max-w-lg mx-auto tracking-tighter md:tracking-normal  ">Don't just take our word for it. Here's what our users are saying.</p>
       </div>
          
       <div className="flex mt-8 justify-center flex-wrap gap-8">
{
    dummyTestimonialData.map((data, index) => (
        <div key={index} className="w-[350px] h-[250px] md:w-xl lg:w-[350px] bg-white rounded-lg shadow-md p-6 flex flex-col items-start justify-between hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2 ">  
         {
             Array.from({ length: data.rating }).map((_, starIndex) => (
                <Star key={starIndex} className="h-4 w-4 text-[#5044E5] fill-[#5044E5]" /> 
             ))
         }
         </div>
          
            <p className="text-gray-600 text-start text-sm md:text-lg lg:text-sm">"{data.content}"</p> 
              <hr className="text-slate-500 w-full h-1 " />
            <div className="flex w-full  gap-4 items-center ">
                <img src={data.image} alt={data.name}  className="h-10 w-10 rounded-full"/>
                <div>
                    <h4 className="text-slate-800 font-medium">{data.name}</h4>
                    <p className=" text-sm text-gray-600">{data.title}</p>
                </div>
            </div>
        </div>
    ))

}
       </div>
      </div>
      
   </>
  )
}

export default Testimonial