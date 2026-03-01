import { Edit, Hash, Sparkles } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../Lib/axios";
import { handleError } from "../Lib/toast";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";
const BlogTitles = () => {
const {getToken}=useAuth()

  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  // All State varaibles
  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0]);
  const [content,setContent]=useState("");
  const [loading , setLoading]=useState(false)
  const [input, setInput] = useState("");

  // Prompt defined here

 const prompt = `Write the best blog titles of ${input} in the category ${selectedCategory}`;


  const onSubmitHandler = async (e) => {
    e.preventDefault();

     try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "ai/generate-blog-titles",
        {
          prompt
          
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        setContent(data.content || "An error occurred while generating titles");
      } else {
        const msg = data.message || "An error occurred while generating titles";
      await  handleError(msg);
      }
    } catch (error) {
      const msg = error.message;
      handleError(msg);
    } finally {
      setLoading(false);
      setInput("");
      setSelectedCategory(blogCategories[0])
    }
  };
  

  return (
    <>
      <div className="h-full overflow-y-scroll  p-6 flex items-start flex-wrap gap-x-4 gap-y-6 text-slate-700  ">
        {/* Left section */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200 xxl:max-w-lg "
        >
          <div className="flex gap-4 items-center justify-start">
            <Sparkles className="w-6 text-[#8E37EB]" />
            <h2 className="text-xl font-semibold ">AI Title Generator</h2>
          </div>
          <p className="mt-6 text-sm font-medium">Keywords</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="The future of artificial intelligence is..."
            required
          />

          <p className="mt-4 text-sm font-medium">Category</p>

          <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
            {blogCategories.map((item, index) => (
              <span
                onClick={() => setSelectedCategory(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer
                ${
                  selectedCategory === item
                    ? "bg-purple-50 text-purple-700"
                    : " text-gray-500"
                }`}
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
          <br />
          <button className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#a95ff8] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
           {loading ? (
            <span className="w-4 h-4 rounded-full my-1 border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
            Generate Titles
          </button>
        </form>
        {/* Right section */}
        <div className="w-full max-w-md xxl:max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]  ">
          <div className="flex justify-start items-center  gap-4 ">
            <Hash className="w-5 h-5 text-[#8E37EB]" />
            <h1 className="text-xl font-semibold">Generated Titles</h1>
          </div>
           {!content ? (
                    <div className="flex-1 flex justify-center items-center  ">
                      <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                        <Edit className="w-9 h-9" />
                        <p className="text-center">
                          {" "}
                          Enter keywords and click "Generate Titles" to get started
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
                      <div className="reset-tw">
                        <Markdown>{content}</Markdown>
                      </div>
                    </div>
                  )}
        </div>
      </div>
    </>
  );
};

export default BlogTitles;
