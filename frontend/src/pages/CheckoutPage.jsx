import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

export default function CheckoutPage() {

  const {cart}= useContext(CartContext)

  // console.log(cart);
  // const cartItems = [
  //   {
  //     id: 1,
  //     title: 'The Great Gatsby',
  //     price: 499,
  //     quantity: 2,
  //   },
  //   {
  //     id: 2,
  //     title: 'Atomic Habits',
  //     price: 299,
  //     quantity: 1,
  //   },
  // ];

  const totalPrice = cart.reduce((acc, item) => acc + item.new_price * item.quantity, 0);

  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    phone: '',
    total:totalPrice,
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (
      !address.name ||
      !address.street ||
      !address.city ||
      !address.postalCode ||
      !address.phone
    ) {
      toast.warning('Please fill in all the delivery address fields.');
      return;
    }
    
    console.log(address)

    alert('Order Placed Successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-600 mb-10">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left - Cart Items */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-pink-600 mb-6">Your Cart</h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-600">{item.title}</h3>
                  <p className="text-sm text-gray-600 ">Qty: {item.quantity}</p>
                </div>
                <p className="text-green-600 font-semibold text-lg">
                  ₹{item.new_price * item.quantity}
                </p>
              </div>
            ))}

            {/* Address Form */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Delivery Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full col-span-1 sm:col-span-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={address.postalCode}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                />
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-pink-600 mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Shipping</span>
                <span>₹50</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-4 text-gray-900">
                <span>Total</span>
                <span className='text-green-500'>₹{totalPrice + 50}</span>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold text-lg transition"
              onClick={handleOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
