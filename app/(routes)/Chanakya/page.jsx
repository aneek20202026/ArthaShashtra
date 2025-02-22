"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const api =process.env.NEXT_PUBLIC_API_URL ;



const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "**You are a business assistant. Now give answers according to your capability of solving business problems.**\n\n**Topics I can help with:**\n\n1. **Marketing and Advertising**: Developing marketing plans, creating social media campaigns, and analyzing consumer behavior.\n2. **Financial Management**: Budgeting, forecasting, and financial analysis, including cash flow management, expense tracking, and investment analysis.\n3. **Operations and Supply Chain**: Optimizing business processes, managing inventory, and streamlining logistics and transportation.\n4. **Human Resources**: Recruitment strategies, employee training and development, and benefits administration.\n5. **Market Research**: Conducting studies, analyzing trends, and identifying opportunities for growth and expansion.\n6. **Strategy and Planning**: Developing business plans, setting goals and objectives, and identifying key performance indicators (KPIs).\n\n**What specific business-related task or question would you like help with?**",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { content: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(`${api}/chatBot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_history: messages }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { content: data.message, role: "assistant" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 p-4 overflow-y-auto max-h-[80vh] space-y-4">
        {messages.length > 1 ? (
          messages.map(
            (msg, index) =>
              msg.role !== "system" && (
                <div
                  key={index}
                  className={`flex items-center ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-md text-sm ${
                      msg.role === "user"
                        ? "bg-lime-500 text-black"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              )
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            <ReactMarkdown>**Ask Anything to Chanakya**</ReactMarkdown>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-800 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-full outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-lime-500 p-2 rounded-full hover:bg-lime-600"
        >
          <Send className="text-black" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
