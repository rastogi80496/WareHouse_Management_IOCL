import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer";
import homepage from '../images/homepage.png';

function HomePage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 relative"
        style={{ backgroundImage: `url(${homepage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-3xl text-center mt-16">
          <h1 className="text-sm tracking-widest text-indigo-300 mb-6">
            ✦ Indian Oil Corporation Ltd. Presents ✦
          </h1>

          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
            Warehouse Management Tools
          </h1>

          <p className="text-lg text-gray-200 mb-10">
            Transform warehouse and inventory management with intelligent, AI-powered tools that make operations faster and easier
          </p>

          <hr className="border-white/20 mb-12" />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl h-52 flex flex-col items-center justify-center hover:scale-105 transition">
              <h2 className="text-lg text-indigo-200">Easy To Use</h2>
              <p className="text-4xl font-bold text-white mt-2">70%</p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl h-52 flex flex-col items-center justify-center hover:scale-105 transition">
              <h2 className="text-lg text-blue-200">Management Efficiency</h2>
              <p className="text-4xl font-bold text-white mt-2">60%</p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl h-52 flex flex-col items-center justify-center hover:scale-105 transition">
              <h2 className="text-lg text-purple-200">Workload Reduction</h2>
              <p className="text-4xl font-bold text-white mt-2">50%</p>
            </div>
          </div>

          <hr className="border-white/20 my-16" />

          {/* FAQ Section */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-indigo-300 mb-8">
              Frequently Asked Questions
            </h2>

            {[
              {
                question: "What is this platform about?",
                answer:
                  "A web-based platform that simplifies stock inflow and outflow management at IOCL."
              },
              {
                question: "How to use this platform?",
                answer:
                  "The platform allows users to sign up based on their role—staff, user, or admin—ensuring appropriate access and functionality"
              },
              {
                question: "Can we check the available quantity of products in the warehouse?",
                answer:
                  "Yes, the system provides real-time tracking of product quantities available in the warehouse."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="mb-6 border-b border-white/20 pb-4"
              >
                <button
                  className="w-full flex justify-between items-center text-lg font-semibold text-gray-100 hover:text-indigo-300 transition"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openFAQ === index ? <FaMinus /> : <FaPlus />}
                </button>

                {openFAQ === index && (
                  <p className="mt-3 text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;