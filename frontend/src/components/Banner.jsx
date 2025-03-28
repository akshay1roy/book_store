import React from "react";
import last4 from "../assets/last4.jpg";

export default function Banner() {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-purple-700 text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between ">
      
      {/* Left Side: Text Content */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Your Next Great <span className="text-yellow-300">Read</span> Awaits! 📖
        </h1>
        <p className="mt-5 text-lg md:text-xl text-gray-200">
          Dive into a world of bestsellers, thrillers, and timeless classics.
          Your perfect book is just a click away.
        </p>

        <button className="mt-6 px-7 py-3 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105">
          Explore Now →
        </button>
      </div>

      {/* Right Side: Book Image */}
      <div className="mt-10 md:mt-0">
        <img
          src={last4}
          alt="Books"
          className="w-88 md:w-80 lg:w-96 h-auto drop-shadow-2xl rounded-lg transform hover:scale-105 transition-all duration-300"
        />
      </div>
    </div>
  );
}
