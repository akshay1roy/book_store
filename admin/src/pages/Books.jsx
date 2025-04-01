import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

export default function Books() {
  const { books, aToken, getAllBooks } = useContext(AdminContext);
  const navigate = useNavigate();

  const categories = [...new Set(books.map((book) => book.category))];

  const [filteredBooks, setFilterBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      setFilterBooks(books.filter((book) => book.category === selectedCategory));
    } else {
      setFilterBooks(books);
    }
  }, [selectedCategory, books]);

  useEffect(() => {
    if (aToken) {
      getAllBooks();
    }
  }, [aToken]);

  return (
    <div className="flex flex-col md:flex-row p-2 bg-gray-100 min-h-screen">
      {/* Left Sidebar - Categories */}
      <div className="w-full md:w-1/6 bg-white p-4 rounded-lg shadow-lg mb-4 md:mb-0">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul>
          <li
            className={`py-2 mt-2 cursor-pointer hover:bg-gray-200 px-4 rounded-md ${
              selectedCategory === "" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </li>

          {categories.map((category) => (
            <li
              key={category}
              className={`py-2 mt-2 cursor-pointer hover:bg-blue-300 px-4 rounded-md ${
                category === selectedCategory ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === category ? "" : category)
              }
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Area - Books */}
      <div className="w-full md:w-3/4 pl-6">
        <h1 className="text-3xl font-semibold mb-6">
          Books in {selectedCategory || "All"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="bg-white p-6 rounded-lg shadow-lg">
              {/* Book Image */}
              <img
                src={book.image}
                alt={book.title}
                onClick={() => navigate(`/books/${book._id}`)}
                className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
              />

              <h2 className="text-xl font-medium">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-500 text-sm">Category: {book.category}</p>
              <div className="mt-4 flex justify-between">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
