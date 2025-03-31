import React, { useState } from "react";
import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SingleBook from "./pages/SingleBook";

const App = () => {
  const [atoken, setAtoken] = useState(true);

  return atoken ? (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<SingleBook/>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
    </>
  );
};

export default App;
