import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react"; // Importing icons from lucide-react

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    rating: 4.5,
    oldPrice: "$20.00",
    newPrice: "$14.99",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    rating: 5,
    oldPrice: "$25.00",
    newPrice: "$18.99",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
    rating: 4,
    oldPrice: "$18.00",
    newPrice: "$12.50",
  },
  {
    id: 4,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg",
    rating: 3.5,
    oldPrice: "$22.00",
    newPrice: "$16.99",
  },
];

// Function to render star ratings using Lucide-react
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <div className="flex justify-center mt-2 text-yellow-500">
      {Array(fullStars).fill().map((_, i) => <Star key={i} fill="currentColor" stroke="none" />)}
      {halfStar && <StarHalf fill="currentColor" stroke="none" />}
      {Array(5 - fullStars - (halfStar ? 1 : 0)).fill().map((_, i) => <StarOff key={i + fullStars} />)}
    </div>
  );
};

export default function Recommended() {
  return (
    <div className="py-16 mt-5 px-6 md:px-16 ">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 text-center mb-6">
        Recommended Books 📚
      </h2>


      <p className="sm:w-2/3 md:w-1/2 text-center text-gray-700  mx-auto text-sm mb-10">
        Discover our top book recommendations across self-improvement, finance, productivity, and personal growth. 
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.slice(0.8).map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2  "
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-40 h-56 object-cover rounded-lg "
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            
            {/* Star Rating */}
            {renderStars(book.rating)}
            
            {/* Price Section */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">{book.newPrice}</span>
              <span className="text-gray-500 line-through">{book.oldPrice}</span>
            </div>

            <button className="mt-4 px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
