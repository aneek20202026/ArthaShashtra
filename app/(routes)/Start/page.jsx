"use client"
import React, { useState } from "react";
import { WelcomeQues } from "@/lib/welcomeques";
import Reveal from "@/app/_components/Reveal";

function WelcomeForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

  const currentQuestion = WelcomeQues[currentIndex];

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleNext = () => {
    if (answers[currentQuestion.question]) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      showAlert("Please answer the question before proceeding.");
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleChange = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.question]: value }));
  };

  const handleSubmit = () => {
    if (answers[currentQuestion.question]) {
      console.log("Form Submitted", answers);
    } else {
      showAlert("Please answer the question before submitting.");
    }
  };

  return (
    <section className="bg-gray-50 h-screen flex items-center justify-center bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
        {alertMessage && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-md">
            {alertMessage}
          </div>
        )}
      <div className="max-w-md text-center border-indigo-900 border-2 rounded-lg p-6 bg-white/10 backdrop-blur relative">
        <h1 className="text-2xl font-extrabold sm:text-3xl mb-4">
          {currentQuestion.question}
        </h1>
        {currentQuestion.type === "opt" ? (

          <div className="flex flex-col gap-2">
            {currentQuestion.options.map((option, index) => (
              <Reveal key={index}>
              <button
                
                onClick={() => handleChange(option)}
                className={`px-4 py-2 rounded-md border w-full text-center transition duration-300 ${
    answers[currentQuestion.question] === option
                    ? "bg-indigo-600 text-white"
                    : "border-gray-300 hover:bg-gray-200"
                }`}
                
              >
                {option}
              </button>
              </Reveal>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={answers[currentQuestion.question] || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        )}
        <div className="mt-6 flex justify-between">
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Previous
            </button>
          )}
          {currentIndex < WelcomeQues.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default WelcomeForm;
