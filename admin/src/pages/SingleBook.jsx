import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Book, Tag, DollarSign, Star, TrendingUp ,Loader } from 'lucide-react'; // Import icons from lucide-react

export default function SingleBook() {
  const { getSingleBook, aToken, singleBook, backendUrl } =
    useContext(AdminContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const handelDeleteBook = async () => {
    try {
      alert("Do you want to delete the book?");
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-book/${id}`,
        { headers: { atoken: aToken } }
      );
      if (data.success) {
        toast.success("Book Deleted Successfully");
        navigate('/books');
      } else {
        toast.error("Book didn't delete.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchBook=async()=>{
      if(aToken)
      {
        setLoading(true);
        await getSingleBook(id);
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-blue-500 w-12 h-12" />
        <p className="ml-3 text-xl font-semibold text-gray-600">Loading Book...</p>
      </div>
    );
  }

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
        <div className="md:w-1/2 w-full p-6  flex  flex-col justify-between min-h-[28rem]">
          <div>
            <h1 className="text-3xl  font-bold text-gray-800 mb-3">
              {singleBook.title}
            </h1>

            <p className="text-lg text-gray-600 mb-2  flex items-center">
              <Tag className="mr-2 text-indigo-500" />
              <strong> Category:</strong>{" "}
              <span className="text-indigo-500 ml-2 font-semibold">
                {singleBook.category}
              </span>
            </p>

            <p className="text-gray-600 flex  mb-4">
              {/* <Book className="mr-2 text-yellow-500" /> */}
              <strong> About:</strong> <p className="ml-2 text-gray-500 " >{singleBook.about}</p>
            </p>

            <p className="text-lg text-gray-700 mb-4  flex items-center">
              <DollarSign className="mr-2 text-green-500" />
              <strong> Price:</strong>{" "}
              <span className="text-green-500 font-bold ml-2">
                ₹{singleBook.new_price}
              </span>
              <span className="text-gray-500 line-through ml-2">
                ₹{singleBook.old_price}
              </span>
            </p>

            <p className="text-lg text-gray-700 mb-4  flex items-center">
              <Star className="mr-2 text-yellow-400" />
              <strong className="mr-2"> Rating:</strong> {singleBook.rating} / 5
            </p>

            <p className="text-lg text-gray-700 mb-4  flex items-center">
              <TrendingUp className="mr-2 text-red-500" />
              <strong className="mr-2"> Trending:</strong> {singleBook.trending ? "Yes" : "No"}
            </p>
          </div>

          {/* Buttons */}
          <div className=" flex gap-4 mt-6">
            <button className="w-1/2 px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              ✏️ Edit
            </button>
            <button
              onClick={handelDeleteBook}
              className="w-1/2 px-6 py-2 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
