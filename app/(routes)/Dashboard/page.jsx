"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { ShoppingCart, DollarSign, Wallet, PiggyBank, User, BarChart3, LogOut, Search ,X,BookText} from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Reveal from "../../_components/Reveal";
// import Growth from "../../_components/Growth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SkeletonLoader = () => (
  <div className="animate-pulse p-6 bg-gray-900 min-h-screen">
    <div className="h-12 w-60 bg-gray-700 rounded mb-6"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(4).fill(0).map((_, i) => (
        <Card key={i} className="p-6 flex items-center justify-between shadow-md">
          <div>
            <div className="h-6 w-40 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 w-28 bg-gray-600 rounded"></div>
          </div>
          <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
        </Card>
      ))}
    </div>
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
      <div className="h-12 w-48 bg-gray-700 rounded"></div>
      <div className="h-12 w-48 bg-gray-700 rounded"></div>
    </div>
    <div className="h-12 w-48 bg-gray-700 rounded mt-6"></div>
    <div className="h-80 bg-gray-800 rounded-lg mt-8"></div>
  </div>
);

const Page = () => {
  const { user, isLoaded } = useUser();
const [userData, setUserData] = useState(null);
const [showModal, setShowModal] = useState(false);
const [messages, setMessages] = useState([]);
const [prompt, setPrompt] = useState("");

const generatePDF = async () => {
    if (!user) {
        alert("User not authenticated");
        return;
    }

    const mail = user.emailAddresses[0]?.emailAddress;
    const uname = user.firstName;

    try {
        const response = await fetch(`${API_URL}/pdfGenerator`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail,
                prompt: [
                    {
                        role: "system",
                        content: `Dont Give Anything else except the report data. You are Arthashastra, an advanced AI-driven Business Cost Planner.\n\n### Objective:\nYour role is to generate *structured and professional financial reports* based on the user's financial data. Your responses should be formatted in a way that can be *directly converted into a PDF document.\n\n---\n\n### **User's Financial Data:**\njson\n${JSON.stringify(userData, null, 2)}\n\n---\n\n## *📊 Business Financial Report*  \n📅 *Date:* [Current Date]  \n🏢 *Industry:* ${userData?.industry || "N/A"}  \n\n---\n\n### *1. Financial Overview*  \n- *Annual Revenue:* $${userData?.annual_revenue || "N/A"}  \n- *Recurring Expenses:* $${userData?.recurring_expenses || "N/A"}  \n- *Monthly Budget:* $${userData?.monthly_budget || "N/A"}  \n- *Savings:* $${userData?.savings || "N/A"}  \n\n---\n\n### *2. Cost Optimization Strategies*  \n🔹 Identify areas where expenses can be reduced without affecting productivity.  \n🔹 Automate routine financial processes to reduce operational costs.  \n🔹 Negotiate better deals with vendors to lower fixed expenses.  \n\n---\n\n### *3. Profitability Forecast*  \n📈 *Projected Revenue Growth:* [Include insights based on trend analysis]  \n📉 *Expense Management:* [Provide insights on reducing unnecessary expenditures]  \n💰 *Savings Potential:* [Show how financial adjustments can improve overall savings]  \n\n---\n\n### *4. Risk Management Insights*  \n⚠ *Potential Financial Risks:* [List risks based on financial trends]  \n✅ *Mitigation Strategies:* [Provide practical solutions to mitigate risks]  \n\n---\n\n### *5. Actionable Recommendations*  \n✔ Optimize cash flow by maintaining a balance between revenue and expenses.  \n✔ Invest in strategic areas to maximize business growth.  \n✔ Maintain emergency savings for unforeseen business challenges.  \n\n---\n\n### *📌 Final Notes:*  \nThis report provides an *in-depth financial analysis* tailored to the user's business needs. The insights are data-driven and designed to help in *cost optimization, strategic planning, and long-term financial stability.  \n\n---\n\n⚡ **End of Report** ⚡`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                uname,
            }),
        });

        if (response.ok) {
            alert("PDF generation request sent successfully!");
            setShowModal(false)
            setPrompt(" ")

        } else {
            alert("Failed to generate PDF.");
        }
    } catch (error) {
        alert("Error connecting to the server.");
    }
};

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
            console.error("Server Error:", await response.text());
            return;
        }

        const data = await response.json();
        console.log("Full API Response:", data);

        if (!data.message || data.message.length === 0) return;

        const financialData = data.message.filter(item => item.annual_revenue !== undefined);
        if (financialData.length === 0) return;

        const latestFinancialData = financialData[financialData.length - 1];
        setUserData(latestFinancialData);
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};

if (!isLoaded || !userData) return <SkeletonLoader />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hi <span className="capitalize text-lime-400">{user?.username || "Guest"}</span>!</h1>
        <SignOutButton>
          <button className="flex items-center bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
            <LogOut className="mr-2" /> Logout
          </button>
        </SignOutButton>
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

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
        <a href="/UpdateProfile">
          <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            <User className="mr-2" /> Update Profile
          </button>
        </a>
        <a href="/Analytics">
          <button className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            <BarChart3 className="mr-2" /> See Analytics
          </button>
        </a>
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

      {/* <Growth /> */}

      {/* //Cost planner */}
      <div className="py-6 sm:py-8 lg:py-12 my-2">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80">
          {/* Content */}
          <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5 border-2 border-gray-200 rounded-lg">
            <h2 className="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">
              Business Cost <span className="text-lime-300">Planner</span>
            </h2>
            <p className="mb-8 max-w-md text-gray-400">
            Describe your business vision and goals in a few sentences
            </p>
            <div className="mt-auto">
              <button
                onClick={() => setShowModal(true)}
                className=" flex w-[200px] md:w-[400px] rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
              >
               <BookText/> <span className="font-bold text-lg ml-2">Generate</span> 
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
            <img
              src="/header.gif"
              loading="lazy"
              alt="Photo by Dom Hill"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg md:w-[600px] w-96">
            <div className="flex justify-between items-center ">
              <h2 className="text-lg font-bold text-white">What do you want to know?</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="text-white w-6 h-6" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Type your question..."
              value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
              className="mt-4 w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <button
            onClick={generatePDF}
              className={`mt-4 w-full p-2 rounded-lg ${
                prompt.trim() === ""
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-lime-500 hover:bg-lime-600"
              } text-white`}
              disabled={prompt.trim() === ""}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Page;
