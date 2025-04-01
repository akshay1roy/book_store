import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SingleBook from "./pages/SingleBook";
import NewBook from "./pages/NewBook";
import { AdminContext } from "./context/AdminContext";

const App = () => {
  // const [atoken, setAtoken] = useState(false);

  const {aToken}= useContext(AdminContext)

  return aToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<SingleBook />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/new-book" element={<NewBook />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;
