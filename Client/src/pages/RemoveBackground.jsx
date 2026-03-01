import { Eraser, Sparkles } from "lucide-react";
import { useState } from "react";
import { handleError } from "../Lib/toast";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../Lib/axios";

const RemoveBackground = () => {
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append("image", image);
      setLoading(true);
      const { data } = await axiosInstance.post(
        "ai/remove-background",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        await handleError(data.message || "An error occurred while removing background");
      }
    } catch (error) {
      handleError(error.message || "An error occurred while removing background");
    } finally {
      setLoading(false);
      setImage(null);
    }
  };
  console.log(image)

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-6 text-slate-700">
      {/* Left section */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200 xxl:max-w-lg"
      >
        <div className="flex gap-4 items-center">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h2 className="text-xl font-semibold">Background Removal</h2>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Supports JPG, PNG, and other image formats
        </p>

        <button
          type="submit"
          className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            <Eraser className="w-5" />
          )}
          Remove Background
        </button>
      </form>

      {/* Right section */}
      <div className="w-full max-w-md xxl:max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-4 mb-4">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-sm text-center px-4">
            <Eraser className="w-10 h-10 mb-2" />
            <p>Upload an image and click "Remove Background" to see result</p>
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
  );
};

export default RemoveBackground;
