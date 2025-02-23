"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { AlertCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""); // Remove trailing slash if any

const UserDataDisplay = () => {
  const { user, isLoaded } = useUser();
  const [revenueData, setRevenueData] = useState(null);
  const [profitMargin, setProfitMargin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Memoized fetch function to avoid infinite re-renders
  const fetchUserData = useCallback(async (userId) => {
    if (!API_URL) {
      console.error("API_URL is not defined.");
      setFetchError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(`${API_URL}/predictRevenue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: userId }),
      });

      if (!response.ok) {
        console.error("Server Error:", await response.text());
        setFetchError(true);
        return;
      }

      const responseData = await response.json();
      if (!responseData) {
        setFetchError(true);
        return;
      }

      // Set data only if available
      setRevenueData(responseData.revenue ? {
        years: Object.keys(responseData.revenue).map(Number),
        values: Object.values(responseData.revenue),
      } : null);

      setProfitMargin(responseData.profit_margin ?? null);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, [API_URL]); // ✅ Memoized correctly

  // useEffect runs only when necessary
  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchUserData(user.id);
    }
  }, [isLoaded, user?.id, fetchUserData]); // ✅ Stable dependencies

  return (
    <div className="p-6 min-h-screen bg-black text-white flex flex-col items-center bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
      <h2 className="text-2xl font-semibold mb-6">Business Insights</h2>

      {/* Fetch Error Alert */}
      {fetchError && (
        <div className="bg-red-600 text-white p-4 rounded-lg flex items-center gap-2 w-full max-w-md mb-6">
          <AlertCircle className="h-5 w-5" />
          <span>Failed to fetch data. Please try again later.</span>
        </div>
      )}

      {/* Skeleton Loader (While Fetching) */}
      {loading && (
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-pulse bg-gray-800 p-6 rounded-lg h-[400px]"></div>
          <div className="animate-pulse bg-gray-800 p-6 rounded-lg h-[400px]"></div>
        </div>
      )}

      {!loading && !fetchError && (
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full justify-center">
            <h2 className="text-lg font-bold mb-4 text-black
            ">Revenue Prediction</h2>
            {revenueData ? (
              <LineChart
                xAxis={[{ data: revenueData.years, label: "Year" }]}
                series={[{
                  data: revenueData.values,
                  label: "Revenue (in ₹)",
                  area: true,
                  color: "#00D4FF"
                }]}
                width={500}
                height={350}
              />
            ) : (
              <p className="text-gray-400">No revenue data available.</p>
            )}
          </div>

          {/* Profit Margin Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-black">Profit Margin</h2>
            {profitMargin !== null ? (
              <PieChart
                series={[
                  {
                    data: [
                      { id: 1, value: profitMargin, label: `Profit Margin (${Math.round(profitMargin * 100) / 100}%)`, color: "#00D4FF" },
                      { id: 2, value: 100 - profitMargin, label: `Remaining (${Math.round((100 - profitMargin) * 100) / 100}%)`, color: "#1E40AF" },
                    ],
                    innerRadius: 50,
                    outerRadius: 100,
                    paddingAngle: 3,
                  },
                ]}
                width={350}
                height={350}
              />
            ) : (
              <p className="text-gray-400">No profit margin data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDataDisplay;
