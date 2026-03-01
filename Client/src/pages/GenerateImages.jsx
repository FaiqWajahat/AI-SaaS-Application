import { useAuth } from "@clerk/clerk-react";
import { ImageIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../Lib/axios";
import { handleError } from "../Lib/toast";

const GenerateImages = () => {
  const { getToken } = useAuth();

  const imageStyle = [
    "Realistic",
    "Gibli",
    "Anime",
    "Cartoon",
    "Fantasy",
    "3D",
    "Potrait",
  ];

  const [selectedStyle, setSelectedStyle] = useState(imageStyle[0]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const prompt = `Generate a ${selectedStyle} style image of ${input}`;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        setContent(data.content);
      } else {
        await handleError(data.message || "An error occurred while generating the image");
      }
    } catch (error) {
      handleError(error.message || "An error occurred while generating the image");
    } finally {
      setLoading(false);
      setInput("");
      setSelectedStyle(imageStyle[0]);
     
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-x-4 gap-y-6 text-slate-700">
      {/* Left section */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-4 bg-white rounded-lg border border-gray-200 xxl:max-w-lg"
      >
        <div className="flex gap-4 items-center justify-start">
          <Sparkles className="w-6 text-[#51d315]" />
          <h2 className="text-xl font-semibold">AI Image Generator</h2>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 h-28"
          placeholder="A futuristic city at sunset..."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyle.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? "bg-green-50 text-green-700"
                  : "text-gray-500"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image public</p>
        </div>

        <button
          disabled={loading}
          className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#78d64c] to-[#51d315] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full my-1 border-2 border-t-transparent animate-spin"></span>
          ) : (
            <ImageIcon className="w-5" />
          )}
          Generate Image
        </button>
      </form>

      {/* Right section */}
    {/* Right section */}
<div className="w-full max-w-md xxl:max-w-lg p-5 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
  <div className="flex justify-start items-center gap-3 mb-3">
    <ImageIcon className="w-6 h-6 text-[#51d315]" />
    <h1 className="text-xl font-semibold text-gray-800">Generated Image</h1>
  </div>

  {!content ? (
    <div className="flex-1 flex justify-center items-center">
      <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
        <ImageIcon className="w-10 h-10" />
        <p className="text-center px-4">
          Enter a description and click "Generate Image" to get started.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex-1 flex justify-center items-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
      <img
        src={content}
        alt="Generated"
        className="max-w-full max-h-[500px] object-contain transition-all duration-300"
      />
    </div>
  )}
</div>

    </div>
  );
};

export default GenerateImages;
