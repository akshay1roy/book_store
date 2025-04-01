import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

export default function SingleBook() {
  const { getSingleBook, aToken, singleBook } = useContext(AdminContext);
  const { id } = useParams();
  const [showFullAbout, setShowFullAbout] = useState(false);

  useEffect(() => {
    if (aToken) {
      getSingleBook(id);
    }
  }, [id, aToken]);

  if (!singleBook) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-red-600">
        📚 Book not found!
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side - Fixed Image Section */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-6 bg-gradient-to-r from-blue-400 to-indigo-500 min-h-[28rem]">
          <img
            src={singleBook.image}
            alt={singleBook.title}
            className="w-full max-h-96 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>

        {/* Right Side - Book Details */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between min-h-[28rem]">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {singleBook.title}
            </h1>

            <p className="text-lg text-gray-600 mb-2">
              <strong>📖 Category:</strong>{" "}
              <span className="text-indigo-500 font-semibold">
                {singleBook.category}
              </span>
            </p>

            {/* Scrollable About Section */}
            <div className="relative mb-4 max-h-[8rem] overflow-hidden hover:overflow-y-auto pr-2">
              <p className="text-gray-600">
                <strong>📜 About:</strong>{" "}
                {showFullAbout ? singleBook.about : singleBook.about.slice(0, 200) + "..."}
              </p>
              {singleBook.about.length > 200 && (
                <button
                  onClick={() => setShowFullAbout(!showFullAbout)}
                  className="absolute bottom-0 right-0 text-blue-500 font-semibold bg-white py-1 px-2"
                >
                  {showFullAbout ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            <p className="text-lg text-gray-700 mb-4">
              <strong>💰 Price:</strong>{" "}
              <span className="text-green-500 font-bold ml-1">₹{singleBook.new_price}</span>
              <span className="text-gray-500 line-through ml-2">₹{singleBook.old_price}</span>
            </p>

            <p className="text-lg text-gray-700 mb-4">
              <strong>⭐ Rating:</strong> {singleBook.rating} / 5
            </p>

            <p className="text-lg text-gray-700 mb-4">
              <strong>🔥 Trending:</strong> {singleBook.trending ? "Yes" : "No"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="w-1/2 px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              ✏️ Edit
            </button>
            <button className="w-1/2 px-6 py-2 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
