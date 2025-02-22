"use client";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { Card } from "@mui/material";
import { ShoppingCart, DollarSign, Wallet, PiggyBank,CircleArrowUp, Search } from "lucide-react";
import Reveal from '../../_components/Reveal'
import { UserButton, useUser } from "@clerk/nextjs";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2400, 2210, 0, 2000, 2181, 2500, 2100];
const xLabels = ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"];

const Page = () => {
  const { user, isLoaded } = useUser(); // Ensure user data is fully loaded before use

  if (!isLoaded) return <div className="text-center text-lg">Loading...</div>; // Avoid rendering before user is ready

  return (
    <div className="p-6 bg-gray-900 min-h-screen bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Hi <span className="capitalize text-indigo-400">{user?.username || "Guest"}</span>!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Annual Revenue", value: "$15,000", icon: DollarSign },
          { title: "Monthly Budget", value: "12,345", icon: Wallet },
          { title: "Recurring Expenses", value: "1,234", icon: ShoppingCart },
          { title: "Savings", value: "+12%", icon: PiggyBank },
        ].map(({ title, value, icon: Icon }, index) => (
          <Card key={index} className="p-4 flex items-center justify-between shadow-md">
            <div>
              <h2 className="text-lg font-semibold text-indigo-500">{title}</h2>
              <Reveal>
                <p className="text-2xl font-bold">{value}</p>
              </Reveal>
            </div>
            <Icon className="w-10 h-10 text-indigo-600" />
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center w-[400px] h-[40px] mx-auto mt-8">

        <div className="relative inline-flex items-center justify-center gap-4 group">
<a href="/Chanakya">
<button

  className="bg-white text-center w-[400px] md:w-[800px] rounded-2xl h-14 relative text-black text-xl font-semibold group"
  type="button"
>
  <div
    className="bg-indigo-500 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[400px] md:group-hover:w-[800px] z-10 duration-500"
  >
   <Search className="text-white"/>
  </div>
  <p className="translate-x-2">Ask Chanakya</p>
</button>
</a>


        </div>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="flex w-full border-2 border-indigo-300 items-center justify-center bg-white backdrop-blur shadow-lg">
          <BarChart
            xAxis={[{ scaleType: "band", data: ["November", "December", "January"] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            width={500}
            height={300}
          />
        </div>

        <div className="flex w-full mx-auto border-2 border-indigo-300 items-center justify-center bg-white backdrop-blur shadow-lg">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
