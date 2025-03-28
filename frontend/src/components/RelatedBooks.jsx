import React, { useEffect, useState } from "react";
import { books } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function RelatedBooks({ category, bookId }) {
  const navigate = useNavigate();
  const [relBooks, setRelBooks] = useState([]);

  useEffect(() => {
    if (books.length > 0 && category) {
      const newBooks = books.filter(
        (book) => book.category === category && book._id !== bookId
      );
      setRelBooks(newBooks);
    }
  }, [category, bookId]);

  return (
    <div className="py-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Related Books 📚
      </h3>

      {relBooks.length === 0 ? (
        <p className="text-gray-500">No related books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-28 h-40 object-cover rounded-lg"
              />
              <h4 className="mt-3 text-lg font-semibold text-gray-800">
                {book.title}
              </h4>
              <p className="text-gray-500">{book.author}</p>

              <span className="text-yellow-600">{book.category}</span>

              {/* Price Section */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">
                  ${book.new_price}
                </span>
                <span className="text-gray-500 line-through">
                  ${book.old_price}
                </span>
              </div>

              <button onClick={()=>{navigate(`/book/${book.bookId}`); scrollTo(0.0)}} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
