import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';

export default function Orders() {
  const { backendUrl, aToken } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/orders/getallorders`, {
          headers: { atoken: aToken },
        });
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl, aToken]);

  const getOrderStatusBadge = (status) => {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold';
    if (status === 'processing') return `${base} bg-yellow-100 text-yellow-700`;
    if (status === 'shipped') return `${base} bg-blue-100 text-blue-700`;
    if (status === 'delivered') return `${base} bg-green-100 text-green-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  const getPaymentBadge = (status) => {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold';
    if (status === 'paid') return `${base} bg-green-100 text-green-700`;
    if (status === 'pending') return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-red-100 text-red-700`;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 text-red-700 px-4 py-2 rounded shadow-md">
        {error}
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 All Orders</h2>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">User ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Books</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Total (₹)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Order Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">City</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Placed At</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3">{order._id}</td>
                <td className="px-4 py-3">{order.userId}</td>
                <td className="px-4 py-3">{order.books?.length || 0}</td>
                <td className="px-4 py-3 font-medium">₹{order.totalAmount}</td>
                <td className="px-4 py-3">
                  <span className={getOrderStatusBadge(order.orderStatus)}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={getPaymentBadge(order.paymentInfo?.status)}>
                    {order.paymentInfo?.status || 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-3">{order.deliveryAddress?.phone || '-'}</td>
                <td className="px-4 py-3 capitalize">{order.deliveryAddress?.city || '-'}</td>
                <td className="px-4 py-3">
                  {new Date(order.placedAt || order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
