import React from "react";
import { useParams } from "react-router-dom";
import { books } from "../assets/assets";

export default function SingleBook() {
  // Sample book data (Replace this with an API call later)
  // const books = [
  //   { id: "1", title: "React for Beginners", author: "John Doe", category: "Programming", description: "A beginner's guide to React.", imageUrl: "https://via.placeholder.com/300" },
  //   { id: "2", title: "JavaScript Essentials", author: "Jane Smith", category: "Programming", description: "Learn the essentials of JavaScript.", imageUrl: "https://via.placeholder.com/300" },
  //   { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", description: "A classic novel about the Jazz Age.", imageUrl: "https://via.placeholder.com/300" },
  // ];

  // Get book ID from URL
  const { id } = useParams();

  // console.log(param)

  // Find the book with the matching ID
  const book = books.find((book) => book._id == id);

  // If book is not found, show an error message
  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        Book not found!
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex justify-center items-center bg-gray-100 p-4 ">
      <div className=" p-6 bg-white  rounded-lg shadow-lg   items-center gap-6 flex flex-col md:flex-row">
        {/* Left Side - Book Image */}
        <div className="w-full sm:w-2/5 md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Book Details */}
        <div className="w-full md:w-2/5 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-1 text-lg">
              <strong>Category:</strong> <span className="text-yellow-500 font-semibold" >{book.category}</span>
            </p>
            <p className="text-gray-500 mb-4 text-lg"> <strong>About:</strong>  {book.about}</p>
            <p className="text-gray-500 mb-4 text-lg">
              <strong>New Price:</strong> <span className="text-green-500 font-bold " >₹{book.new_price}</span>
            </p>
            <p className="text-gray-600 mb-4 text-lg">
              <strong>Old Price:</strong> ₹{book.old_price}
            </p>
            <p className="text-gray-500 mb-4 text-lg">
              <strong>Rating:</strong> {book.rating} ⭐
            </p>
            <p className="text-gray-500 mb-4 text-lg">
              <strong>Trending:</strong> {book.trending ? "Yes" : "No"}
            </p>
          </div>

          {/* Buttons at the Bottom */}
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
