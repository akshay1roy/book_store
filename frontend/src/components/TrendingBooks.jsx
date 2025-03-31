import React, { useContext, useEffect } from "react";
import { Star, StarHalf, StarOff } from "lucide-react";
import { books } from "../assets/assets"; // Ensure this is the correct path
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

// Function to render star ratings
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <div className="flex justify-center mt-2 text-yellow-500">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <Star key={i} fill="currentColor" stroke="none" />
        ))}
      {halfStar && <StarHalf fill="currentColor" stroke="none" />}
      {Array(5 - fullStars - (halfStar ? 1 : 0))
        .fill()
        .map((_, i) => (
          <StarOff key={i + fullStars} />
        ))}
    </div>
  );
};


export default function TrendingBooks() {
  const navigate= useNavigate()
  const {cart, addToCart}= useContext(CartContext);

  // Filter trending books
  const trendingBooks = books.filter((book) => book.trending).slice(0, 8); // Only top 8


  const handleAddToCart=(item)=>{
    addToCart(item);
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

  }


  useEffect(()=>{
    console.log('trending books',cart);
  },[cart])

  return (
    <div className="py-16  px-6 md:px-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-12">
        Trending Books 🔥
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trendingBooks.map((book) => (
          <div
            key={book._id}
            className="group bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={book.image}
                alt={book.title}
                onClick={()=>navigate(`/book/${book._id}`)}
                className="w-40 h-56 object-cover cursor-pointer rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{book.title}</h3>
            <p className="text-gray-500">{book.category}</p>

            {/* Star Rating */}
            {renderStars(book.rating)}

            {/* Price Section */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">${book.new_price}</span>
              <span className="text-gray-500 line-through">${book.old_price}</span>
            </div>

            {/* About Book */}
            {/* <p className="text-gray-600 text-sm mt-3 px-2">{book.about}</p> */}

            <button onClick={()=>handleAddToCart(book)} className="mt-3 px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
