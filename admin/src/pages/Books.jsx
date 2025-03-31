import React, { useEffect, useState } from "react";

import { books } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// import {category } from '../assets/assets'

export default function Books() {

    const navigate=useNavigate();

  const categories = [...new Set(books.map((book) => book.category))];

  const [filteredBooks, setFilterBooks] = useState([]);

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter books based on selected category
  //   const filerBookData= books.filter(book => book.category === selectedCategory);

  useEffect(() => {
    if (selectedCategory) {
      setFilterBooks(
        books.filter((book) => book.category === selectedCategory)
      );
    } else {
      setFilterBooks(books);
    }
  }, [selectedCategory, books]);

  return (
    <div className="flex p-2 bg-gray-100 min-h-screen">
      {/* Left Sidebar - Categories */}
      <div className="w-2/5 md:w-1/6 bg-white p-4 rounded-lg shadow-lg">
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
                setSelectedCategory(
                  selectedCategory === category ? " " : category
                )
              }
              //   onDoubleClick={() => setSelectedCategory("")}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Area - Books */}
      <div className="w-3/4 pl-6">
        <h1 className="text-3xl font-semibold mb-6">
          Books in {selectedCategory}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white  p-6 rounded-lg shadow-lg">
              {/* Book Image */}
              <img
                src={book.image}
                alt={book.title}
                onClick={()=>navigate(`/books/${book._id}`)}
                className="w-full h-48 object-cover rounded-md mb-4"
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
