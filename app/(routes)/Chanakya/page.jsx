import React, { useState } from "react";
// import "./App.css";

const api="https://0zf511zz-5000.inc1.devtunnels.ms/"

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "system" ,
      content: "You are a business assistant. Now give answers according to your capability of solving business problems." 
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { content: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    try {
      const response = await fetch(`${api}chatBot`, {
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


  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          (msg.role!=="system" && <div
            key={index}
            className={`chat-message ${msg.role}`}
          >
            {msg.content}
          </div>)
        ))}
      </div>
      <div className="chatbot-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
