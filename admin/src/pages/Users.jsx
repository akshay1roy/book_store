import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Users = () => {
  const { users, getAllUser, aToken } = useContext(AppContext);

  console.log("Users:", users);

  const [search, setSearch] = useState("");

  // Filter users by name or email
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getAllUser();
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        User Management
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Updated At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone || "N/A"}</td>
                  <td className="py-3 px-4">{user.gender || "Not Selected"}</td>
                  <td className="py-3 px-4">{user.dob || "Not Selected"}</td>
                  <td className="py-3 px-4 capitalize">{user.role || "N/A"}</td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
