import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axiosInstance from "../Lib/axios";
import { handleError, handleSuccess } from "../Lib/toast";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { getToken } = useAuth();

  const FetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/user/get-publish-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        handleError(
          data.message || "Something went wrong while fetching creations"
        );
      }
    } catch (error) {
      handleError(
        error.message || "Something went wrong while fetching creations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) FetchData();
  }, [user]);

  const toggleLike = async (creationId) => {
    // Optimistic UI update
    setCreations((prev) =>
      prev.map((creation) => {
        if (creation.id === creationId) {
          const alreadyLiked = creation.likes.includes(user.id);
          return {
            ...creation,
            likes: alreadyLiked
              ? creation.likes.filter((id) => id !== user.id)
              : [...creation.likes, user.id],
          };
        }
        return creation;
      })
    );

    try {
      const { data } = await axiosInstance.post(
        "/user/toggle-like-creations",
        { creationId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        handleSuccess(data.message);
      } else {
        handleError(data.message || "Failed to toggle like");
        // Revert if API fails
        FetchData();
      }
    } catch (error) {
      handleError(error.message || "Something went wrong while toggling like");
      FetchData(); // revert state on error
    }
  };

  return (
    <div className="flex flex-1 h-full flex-col gap-4 p-6">
      <h2 className="text-lg font-semibold text-gray-800">Creations</h2>

      <div className="bg-white h-full w-full rounded-xl p-4 overflow-y-scroll">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#5044E5] rounded-full animate-spin"></div>
          </div>
        ) : creations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creations.map((creation) => (
              <div
                key={creation.id}
                className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={creation.content}
                  alt="creation"
                  className="w-full h-64 object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-white mb-2">{creation.prompt}</p>
                  <div className="flex gap-2 items-center text-white">
                    <p>{creation.likes.length}</p>
                    <Heart
                      onClick={() => toggleLike(creation.id)}
                      className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform ${
                        creation.likes.includes(user.id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">No creations found.</p>
        )}
      </div>
    </div>
  );
};

export default Community;
