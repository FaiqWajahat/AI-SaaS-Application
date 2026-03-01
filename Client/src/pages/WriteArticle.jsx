import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../Lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { handleError } from "../Lib/toast";
import Markdown from "react-markdown";

const WriteArticle = () => {
  const { getToken } = useAuth();

  const articleLength = [
    { length: 800, text: "Short (500-800 words) " },
    { length: 1200, text: "Medium (800-1200 words) " },
    { length: 1600, text: "Long (1200+ words) " },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [Content, setContent] = useState("");

  const prompt = `Write an article about ${input}, with a length of ${selectedLength.length} words.`;
  console.log(input);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
        },
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
        const msg = data.message || "An error occurred while generating the article";
      await  handleError(msg);
      }
    } catch (error) {
      const msg = error.message || "An error occurred while generating the article";
      handleError(msg);
    } finally {
      setLoading(false);
      setInput("");
      setSelectedLength(articleLength[0]);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-x-4 gap-y-6 text-slate-700 ">
      {/* Left section */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md xxl:max-w-lg p-4 bg-white rounded-lg border border-gray-200 "
      >
        <div className="flex gap-4 items-center justify-start">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h2 className="text-xl font-semibold ">Article Configuration</h2>
        </div>
        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer
                ${
                  selectedLength.text === item.text
                    ? "bg-blue-50 text-blue-700"
                    : " text-gray-500"
                }`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />
        <button
          disabled={loading}
          className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 rounded-full my-1 border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-5" />
          )}
          Generate Article
        </button>
      </form>
      {/* Right section */}
      <div className="w-full max-w-md xxl:max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px] ">
        <div className="flex justify-start items-center  gap-4 ">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>
        {!Content ? (
          <div className="flex-1 flex justify-center items-center  ">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p className="text-center">
                {" "}
                Enter a topic and click "Generate article" to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-s text-slate-600">
            <div className="reset-tw">
              <Markdown>{Content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
