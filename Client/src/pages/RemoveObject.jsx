import { useAuth } from "@clerk/clerk-react";
import {  Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import { handleError } from "../Lib/toast";
import axiosInstance from "../Lib/axios";

const RemoveObject = () => {

  const {getToken } = useAuth();
  
  // All State variables

  const [image, setImage] = useState(null);
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("object", textArea);

      const { data } = await axiosInstance.post(
        "ai/remove-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        const msg = data.message;
        await handleError(msg || "An error occurred while removing the object");
      }
    } catch (error) {
      const msg = error.message || "An error occurred while removing the object";
      handleError(msg);
    } finally {
      setLoading(false);
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
            <h2 className="text-xl font-semibold ">Object Removal</h2>
          </div>
          <p className="mt-6 text-sm font-medium">Upload Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
            required
          />

          <p className="text-xs text-gray-500 foont-light mt-1 ">
            Supports JPG, PNG and other image formats
          </p>
          <p className="mt-6 text-sm font-medium ">Upload Image</p>
          <textarea
            type="text"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 h-28"
            placeholder="e.g.., watch or spoon, only single object name."
            required
          />
          <button className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
             {loading ? (
            <span className="w-4 h-4 rounded-full my-1 border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}
            Remove Object
          </button>
        </form>
        {/* Right section */}
        <div className="w-full max-w-md xxl:max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]  ">
          <div className="flex justify-start items-center  gap-4 ">
            <Scissors className="w-5 h-5 text-[#8E37EB]" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>
          {!content ? (
          <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-sm text-center px-4">
            <Scissors className="w-10 h-10 mb-2" />
            <p> Upload the image, mention the opject and click "Remove Object" to continue </p>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
            <img
              src={content}
              alt="Processed"
              className="max-w-full max-h-[500px] object-contain transition-all duration-300"
            />
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default RemoveObject;
