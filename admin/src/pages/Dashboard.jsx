import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AdminContext } from '../context/AdminContext';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export default function Dashboard() {
  const { books, aToken, getAllBooks } = useContext(AdminContext);
  const { backendUrl } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);

  // const categories = [...new Set(books.map((book) => book.category))];

  const booksByCategory = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});

  const booksByCategoryArray = Object.keys(booksByCategory).map((category) => ({
    name: category,
    count: booksByCategory[category],
  }));

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/orders/getallorders`, {
        headers: { atoken: aToken },
      });
      setOrders(data.orders);
      const totalRevenue = data.orders.reduce((acc, order) => acc + order.totalAmount, 0);
      setRevenue(totalRevenue);
    } catch (error) {
      console.log(error);
    }
  };

  const salesData = [
    { name: 'Week 1', sales: 400 },
    { name: 'Week 2', sales: 450 },
    { name: 'Week 3', sales: 300 },
    { name: 'Week 4', sales: 500 },
  ];

  const recentActivities = [
    'New Book Added: "React for Beginners"',
    'Order #45 has been shipped',
    'New User Registered: John Doe',
  ];

  useEffect(() => {
    if (aToken) {
      getAllBooks();
      getAllOrders();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Books */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Books</h2>
          <p className="text-3xl font-bold text-blue-500">{books?.length || 0}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Orders</h2>
          <p className="text-3xl font-bold text-pink-500">{orders?.length || 0}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-500">₹{revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Books by Category Chart */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4">Books by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={booksByCategoryArray}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => (Number.isInteger(value) ? value : '')} allowDecimals={false} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Overview Chart */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4">Sales Overview (Weekly)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activities */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4">Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index} className="border-b py-2">{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
