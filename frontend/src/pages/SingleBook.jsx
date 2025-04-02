import { useParams } from "react-router-dom";
// import { books } from "../assets/assets"; // Ensure correct path
import { Star, StarHalf, StarOff } from "lucide-react";
import RelatedBooks from "../components/RelatedBooks";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { UserAppContext } from "../context/UserAppContext";
import { toast } from "react-toastify";

export default function SingleBook() {
  const { books } = useContext(UserAppContext);
  const { addToCart } = useContext(CartContext);
  const { bookId } = useParams();
  // const {cart, addToCart,removeFromCart}= useContext(CartContext);

  const book = books.find((b) => b._id == bookId);

  // console.log(data)

  if (!book) {
    return (
      <p className="text-center text-red-500 text-lg mt-10">Book not found!</p>
    );
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // Function to render star ratings

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex text-yellow-500 mt-2">
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

  return (
    <div className="py-16 px-6 md:px-16">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Book Image */}
        <div className="w-[40%] md:max-w-1/4">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-900">{book.title}</h2>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p className="text-gray-500 mt-1">{book.author}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {book?.category}
            </button>
          </div>
          {renderStars(book.rating)}

          {/* Price Section */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              ${book.new_price}
            </span>
            <span className="text-gray-500 line-through">
              ${book.old_price}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700 leading-relaxed">{book.about}</p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => handleAddToCart(book)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg  shadow-md hover:bg-blue-600 transition-all"
            >
              Add to cart
            </button>
            <button className="px-6 py-3 bg-yellow-400 text-gray-600 rounded-lg font-medium shadow-md hover:bg-yellow-500 transition-all">
              Add to favorite
            </button>
          </div>
        </div>
      </div>
      <RelatedBooks bookId={bookId} category={book?.category} />
    </div>
  );
}
