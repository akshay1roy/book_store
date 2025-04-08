import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CardPage() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.new_price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner">
          <p className="text-lg text-gray-500">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-36 object-cover rounded-lg shadow-sm"
                />
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${item.new_price}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      removeFromCart(item);
                      toast.warn("Item quantity decreased");
                    } else {
                      toast.warn("Item removed from cart");
                      removeFromCart(item);
                    }
                  }}
                  className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => {
                    addToCart(item);
                    toast.success("Item quantity increased");
                  }}
                  className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                >
                  +
                </button>
              </div>

              <div className="text-center md:text-right">
                <span className="text-gray-600 text-sm">Price</span>
                <p className="text-lg font-semibold text-green-600 mt-1">
                  ${(item.new_price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-inner flex flex-col md:flex-row items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </h3>
          <button
            onClick={() => navigate("/check-out")}
            className="mt-4 md:mt-0 cursor-pointer px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
