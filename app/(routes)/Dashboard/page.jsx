"use client";
import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "@mui/material";
import { ShoppingCart, DollarSign, Wallet, PiggyBank, Search, LogOut } from "lucide-react";
import Reveal from "../../_components/Reveal";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Growth from "../../_components/Growth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SkeletonLoader = () => (
  <div className="animate-pulse p-6 bg-gray-900 min-h-screen">
    <div className="h-10 w-48 bg-gray-700 rounded mb-6"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(4).fill(0).map((_, i) => (
        <Card key={i} className="p-4 flex items-center justify-between shadow-md">
          <div>
            <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
            <div className="h-7 w-24 bg-gray-600 rounded"></div>
          </div>
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        </Card>
      ))}
    </div>
    <div className="h-14 w-[400px] md:w-[800px] bg-gray-700 rounded-2xl mx-auto mt-8"></div>
    <div className="h-80 bg-gray-800 rounded-lg mt-8"></div>
  </div>
);

const Page = () => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    fetchUserData(user.id);
  }, [isLoaded, user?.id]);

  const fetchUserData = async (userId) => {
    try {
      console.log("Fetching user data for UID:", userId);

      const response = await fetch(`${API_URL}/userData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: userId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        return;
      }

      const data = await response.json();
      console.log("Full API Response:", data);

      if (!data.message || data.message.length === 0) {
        console.error("No valid data received.");
        return;
      }

      // Filter only financial data and get the latest entry
      const financialData = data.message.filter((item) => item.annual_revenue !== undefined);
      if (financialData.length === 0) {
        console.error("No financial data found.");
        return;
      }

      setUserData(financialData[financialData.length - 1]); // Set latest financial data
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  if (!isLoaded || !userData) return <SkeletonLoader />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Hi <span className="capitalize text-lime-400">{user?.username || "Guest"}</span>!
        </h1>
        <a className="flex items-center text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
          <LogOut className="mr-2" />
          <SignOutButton />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-[20px]">
        {[
          { title: "Annual Revenue", value: `₹${userData?.annual_revenue ?? "0"}`, icon: DollarSign },
          { title: "Monthly Budget", value: `₹${userData?.monthly_budget ?? "0"}`, icon: Wallet },
          { title: "Recurring Expenses", value: `₹${userData?.recurring_expenses ?? "0"}`, icon: ShoppingCart },
          { title: "Savings", value: `₹${userData?.savings ?? "0"}`, icon: PiggyBank },
        ].map(({ title, value, icon: Icon }, index) => (
          <Card key={index} className="p-4 flex items-center justify-between shadow-md">
            <div>
              <h2 className="text-lg font-semibold text-lime-500">{title}</h2>
              <Reveal>
                <p className="text-2xl font-bold">{value}</p>
              </Reveal>
            </div>
            <Icon className="w-10 h-10 text-lime-600" />
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center max-w-[400px] md:w-[800px] h-[40px] mx-auto mt-8">
        <a href="/Chanakya">
          <button className="bg-white text-center w-[400px] md:w-[800px] rounded-2xl h-14 text-black text-xl font-semibold group relative">
            <div className="bg-lime-500 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[392px] md:group-hover:w-[792px] z-10 duration-500">
              <Search className="text-white" />
            </div>
            <p className="translate-x-2">Ask Chanakya</p>
          </button>
        </a>
      </div>

      <Growth />

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="flex w-full border-2 border-lime-300 items-center justify-center bg-white rounded-lg backdrop-blur shadow-lg">
          <BarChart
            xAxis={[{ scaleType: "band", data: ["November", "December", "January"] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            width={500}
            height={300}
          />
        </div>
        <div className="flex w-full border-2 border-lime-300 items-center justify-center bg-white rounded-lg backdrop-blur shadow-lg">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5], area: true }]}
            width={500}
            height={300}
          />
        </div>
      </div> */}
    </div>
  );
};

export default Page;
