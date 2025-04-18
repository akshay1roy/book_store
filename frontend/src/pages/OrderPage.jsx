import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserAppContext } from "../context/UserAppContext";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function OrderPage() {
  const { backendUrl, token } = useContext(UserAppContext);
  const { userId } = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); 

  const fetchOrders = async () => {
    try {
      setLoading(true); 
      // console.log("userId", userId);
      const res = await axios.get(`${backendUrl}/api/orders/user/${userId}`, {
        headers: {
          token,
        },
      });

      // console.log(res);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center text-gray-700 py-12 animate-pulse">
          Fetching your orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg shadow-inner">
          You haven’t placed any orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Order ID: <span className="text-gray-900">{order._id}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on: {moment(order.placedAt).format("MMMM Do YYYY, h:mm A")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        order.paymentInfo.status === "paid"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.paymentInfo.status}
                    </span>
                  </p>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Total Amount: ₹{order.totalAmount}</p>
                  <p>Phone: {order.deliveryAddress.phone}</p>
                  <p>City: {order.deliveryAddress.city.trim()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Books:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {order.books.map((book) => (
                    <li key={book._id} className="border-b pb-2 flex justify-between">
                      <span>{book.title}</span>
                      <span>
                        Qty: {book.quantity} × ₹{book.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
