import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';

export default function Dashboard() {
  // Sample data for charts and cards
  const booksByCategory = [
    { name: 'Fiction', count: 120 },
    { name: 'Non-Fiction', count: 80 },
    { name: 'Science', count: 60 },
    { name: 'Technology', count: 90 },
  ];

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Books */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Books</h2>
          <p className="text-3xl font-bold">350</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Orders</h2>
          <p className="text-3xl font-bold">150</p>
        </div>

        {/* Overall Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium">Total Revenue</h2>
          <p className="text-3xl font-bold">$10,500</p>
        </div>
      </div>

      {/* Books by Category Chart */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4">Books by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={booksByCategory}>
            <XAxis dataKey="name" />
            <YAxis />
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
