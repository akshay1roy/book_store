import React, { useContext, useEffect, useState } from "react";
// import { categorires } from "../assets/assets";
import { books } from "../assets/assets"; // Ensure this is the correct path
import { Star, StarHalf, StarOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedBooks from "../components/RelatedBooks";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Books() {
  const { category } = useParams();
  // console.log("categories", category);
  const { cart, addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [filterBook, setFilterBook] = useState([]);

  const applyFilter = () => {
    if (category) {
      setFilterBook(books.filter((book) => book.category === category));
    } else {
      setFilterBook(books);
    }
    // console.log(filterBook)
  };

  const handleAddToCart = (item) => {
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
  };

  // Function to render star ratings using Lucide-react
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

  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  useEffect(() => {
    applyFilter();
  }, [category, books]);

  return (
    <div className="py-16 px-6 md:px-16">
      <p className="text-gray-600 font-semibold  ">
        Browse through the book categories
      </p>

      <div className="flex flex-col gap-8 sm:flex-row mt-5 ">
        {/* left */}
        <div className="flex flex-col gap-4 md:w-[18%] text-sm text-gray-600">
          <p
            onClick={() =>
              category === "History"
                ? navigate("/books")
                : navigate("/books/History")
            }
            className={`sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "History" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            History
          </p>
          <p
            onClick={() =>
              category === "Finance"
                ? navigate("/books")
                : navigate("/books/Finance")
            }
            className={` sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Finance" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Finance
          </p>
          <p
            onClick={() =>
              category === "Science Fiction"
                ? navigate("/books")
                : navigate("/books/Science Fiction")
            }
            className={` sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Science Fiction" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Science Fiction
          </p>
          <p
            onClick={() =>
              category === "Fantasy"
                ? navigate("/books")
                : navigate("/books/Fantasy")
            }
            className={` sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Fantasy" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Fantasy
          </p>
          <p
            onClick={() =>
              category === "Biography"
                ? navigate("/books")
                : navigate("/books/Biography")
            }
            className={` sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Biography" ? "bg-indigo-100 text-black" : ""
            } `}
          >
            Biography
          </p>
        </div>

        {/* right */}

        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6">
          {filterBook.map((item) => (
            <div
              key={item._id}
              className="group bg-white p-4 rounded-lg shadow-lg hover:shadow-xl  transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div
                onClick={() => navigate(`/book/${item._id}`)}
                className="overflow-hidden cursor-pointer rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-40 h-56 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* <p>{item._id}</p> */}
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.category}</p>

              {/* Star Rating */}
              {renderStars(item.rating)}

              {/* Price Section */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">
                  ${item.new_price}
                </span>
                <span className="text-gray-500 line-through">
                  ${item.old_price}
                </span>
              </div>

              {/* About Book */}
              {/* <p className="text-gray-600 text-sm mt-3 px-2">{book.about}</p> */}

              <button
                onClick={() => handleAddToCart(item)}
                className="mt-3 px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// export const category = [
//     // History

//     {
//         category: "History",
//         image: histroy
//     },

//     // Finance
//     {
//         category: "Finance",
//         image: finance
//     },

//     // Science Fiction
//     {
//         category: "Science Fiction",
//         image: science
//     },

//     // Fantasy
//     {
//         category: "Fantasy",
//         image: fantancy
//     },

//     // Biography
//     {
//         category: "Biography",
//         image: bio
//     }

// ]
