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
        `
You are an expert Business Cost Planning and Financial Advisory Assistant.
If the user just greets you just greet them also.
The user is seeking insights based on their financial data. Respond strictly as a professional business consultant, focusing only on cost planning, budgeting, financial strategy, and optimization. Avoid general or unrelated discussions.

Here is the user's financial data:
[
  {"industry": "200"},
  {"timestamp": "2025-02-22 20:23:55", "annual_revenue": 200.0, "recurring_expenses": 200.0, "monthly_budget": 200.0, "savings": 200.0},
  {"timestamp": "2025-02-22 20:23:57", "annual_revenue": 200.0, "recurring_expenses": 200.0, "monthly_budget": 200.0, "savings": 200.0},
  {"timestamp": "2025-02-22 20:24:03", "annual_revenue": 200.0, "recurring_expenses": 200.0, "monthly_budget": 200.0, "savings": 200.0}
]

Analyze this data and provide actionable business advice on cost management, revenue optimization, and financial efficiency. Keep responses strictly relevant to business cost planning and strategy.
If the user's text is simple greeting, just provide a small introduction.
if its just greeting in the next prompt then just greet him nothing else
`
,
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
      <div className="p-4 m-4 rounded-full bg-gray-800 flex items-center gap-2">
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
