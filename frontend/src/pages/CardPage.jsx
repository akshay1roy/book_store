import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CardPage() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const navigate= useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.new_price * item.quantity,
    0
  );

  return (
    <div className="max-w-screen mx-auto p-8 md:px-16 ">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className=" flex flex-col ">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white mt-2 p-4 rounded-lg  shadow-lg  flex flex-col md:flex-row md:justify-around items-center"
            >
              <div className="flex md:flex-row flex-col gap-2  md:gap-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-40 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500">{item.category}</p>
                  <p className="mt-2 text-gray-600 text-lg font-semibold">
                    ${item.new_price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
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
                  className="bg-red-500 cursor-pointer text-white px-6 py-1 rounded-md hover:bg-red-600"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => {
                    addToCart(item);
                    toast.success("Item quantity increased");
                  }}
                  className="bg-green-500 cursor-pointer text-white px-5 py-1 rounded-md hover:bg-green-600"
                >
                  +
                </button>
              </div>
              <div>
                <span className="text-lg md:text-xl font-semibold" >Prices:- </span>
                <span className="text-green-600 font-semibold text-lg ">
                ${(item.new_price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </h3>
          <button onClick={()=>navigate('/check-out')}  className="mt-3 cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
