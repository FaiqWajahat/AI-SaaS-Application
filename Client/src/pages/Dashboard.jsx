import { useEffect, useState } from "react";
import { Coins, Gem, Sparkles } from "lucide-react";
import { Protect, useAuth, useUser } from "@clerk/clerk-react";
import CreationItems from "../components/CreationItems";
import axiosInstance from "../Lib/axios";
import { handleError } from "../Lib/toast";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [freeTokens, setFreeTokens] = useState(0);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const { user } = useUser();

  // Fetch data from the server
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
        setFreeTokens(data.freeTokens);
      } else {
        handleError(data.message || "Something went wrong while fetching creations");
      }
    } catch (error) {
      handleError(error.message || "Something went wrong while fetching creations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div className="h-full overflow-y-scroll p-6 w-full">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Creations */}
        <div className="flex justify-between items-center  p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div>
            <p className="text-sm text-gray-500">Total Creations</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {creations?.length}
            </h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex justify-center items-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Free Tokens */}
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div>
            <p className="text-sm text-gray-500">Free Tokens</p>
            <h2 className="text-2xl font-semibold text-gray-800">
              {freeTokens} <span className="text-gray-400 text-base">/ 10</span>
            </h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex justify-center items-center">
            <Coins className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div>
            <p className="text-sm text-gray-500">Active Plan</p>
            <h2 className="text-xl font-semibold text-gray-800">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex justify-center items-center">
            <Gem className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
    <div className="space-y-3 mt-8">
  <p className="text-lg font-medium text-gray-700">Recent Creations</p>

  {loading ? (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-[#5044E5] rounded-full animate-spin"></div>
    </div>
  ) : creations.length > 0 ? (
    creations.map((item, index) => (
      <CreationItems key={index} item={item} />
    ))
  ) : (
    <p className="text-gray-500 text-sm">No creations yet.</p>
  )}
</div>

    </div>
  );
};

export default Dashboard;
