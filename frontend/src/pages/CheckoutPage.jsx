import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Assuming you're using context
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useContext(CartContext); // You can adjust according to your setup
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert("Order placed successfully!"); // Replace with actual logic
    navigate('/thank-you'); // Optional redirect after placing order
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-medium mb-4">Your Items</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="text-blue-600 font-semibold">₹{item.new_price * item.quantity}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        <div className="flex justify-between text-lg mb-2">
          <span>Total</span>
          <span className="font-bold text-green-600">₹{totalPrice}</span>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mt-4 w-full"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
