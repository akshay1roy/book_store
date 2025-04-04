import React, { useContext, useState } from "react";
// import {books} from '../assets/assets'
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function NewBook() {
  const { aToken, backendUrl } = useContext(AdminContext);

  const [book, setBook] = useState({
    title: "",
    new_price: "",
    old_price: "",
    category: "",
    image: null,
    about: "",
    rating: "",
    trending: false,
  });

  const [previewImage, setPreviewImage] = useState(null);

  
  const categories = [
    "History",
    "Finance",
    "Science Fiction",
    "Fantasy",
    "Biography",
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setBook((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Handle Trending Toggle
  const handleTrendingChange = (e) => {
    setBook({ ...book, trending: e.target.value === "true" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();

    formData.append("title", book.title);
    formData.append("new_price", book.new_price);
    formData.append("old_price", book.old_price);
    formData.append("category", book.category);
    formData.append("about", book.about);
    formData.append("rating", book.rating);
    formData.append("trending", book.trending.toString());
    formData.append("image", book.image);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-book`,
        formData,
        { headers: { aToken } }
      );

      //   console.log(formData);
    //   console.log(data);
      //   console.log("Book Submitted:", response.data);
      if (data.success) {
        console.log(data);
        toast.success(data.message);
      } else {
        toast.error("Failed to Add Book");
      }

      setBook({
        title: "",
        new_price: "",
        old_price: "",
        category: "",
        image: null,
        about: "",
        rating: "",
        trending: false,
      });
      setPreviewImage(null);


    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Title */}
          <div>
            <label className="block text-gray-700 font-medium">
              Book Title:
            </label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* New Price */}
          <div>
            <label className="block text-gray-700 font-medium">
              New Price (₹):
            </label>
            <input
              type="number"
              name="new_price"
              value={book.new_price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Old Price */}
          <div>
            <label className="block text-gray-700 font-medium">
              Old Price (₹):
            </label>
            <input
              type="number"
              name="old_price"
              value={book.old_price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-gray-700 font-medium">Category:</label>
            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Book Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-md"
              required
            />
            {/* Image Preview */}
            {previewImage && (
              <div className="mt-3 flex justify-center">
                <img
                  src={previewImage}
                  alt="Book Preview"
                  className="w-40 h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* About Book */}
          <div>
            <label className="block text-gray-700 font-medium">About:</label>
            <textarea
              name="about"
              value={book.about}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium">
              Rating (Out of 5):
            </label>
            <input
              type="number"
              name="rating"
              value={book.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Trending Selection */}
          <div>
            <label className="block text-gray-700 font-medium">Trending:</label>
            <select
              name="trending"
              value={book.trending}
              onChange={handleTrendingChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
