import { useAuth } from "@clerk/clerk-react";
import { FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import axiosInstance from "../Lib/axios";
import { handleError } from "../Lib/toast";

const ReviewResume = () => {

  // All State variables
  const [resume, setResume] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Getting the token from UseAuth
  const { getToken } = useAuth();

  // Function to handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      setLoading(true);
      const { data } = await axiosInstance.post(
        "ai/resume-analyzer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        await handleError(data.message || "An error occurred while analyzing resume");
      }
    } catch (error) {
      handleError(error.message || "An error occurred while analyzing resume");
    } finally {
      setLoading(false);
      setResume(null);
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
            <Sparkles className="w-6 text-[#009BB3]" />
            <h2 className="text-xl font-semibold ">Resume Review</h2>
          </div>
          <p className="mt-6 text-sm font-medium">Upload Resume</p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
            required
          />

          <p className="text-xs text-gray-500 foont-light mt-1 ">
            Supports PDF resume only.
          </p>

          <button className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
            
            {loading ? (
              <span className="w-4 h-4 rounded-full my-1 border-2 border-t-transparent animate-spin"></span>
            ) : (
              <FileText className="w-5"/>
            )}
            Review Resume
          </button>
        </form>
        {/* Right section */}
        <div className="w-full max-w-md xxl:max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]  ">
          <div className="flex justify-start items-center  gap-4 ">
            <FileText className="w-5 h-5 text-[#009BB3]" />
            <h1 className="text-xl font-semibold">Analysis Results</h1>
          </div>
          {!content ? (
            <div className="flex-1 flex justify-center items-center  ">
  
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <FileText className="w-9 h-9" />
                <p className="text-center">
                  {" "}
                  Upload your resume and click "Review Analyze" to continue
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

export default ReviewResume;
