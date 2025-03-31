import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, LogOut, Menu, X } from "lucide-react";
import footer_logo from "../assets/footer-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Left Section - Logo */}
      <div className="flex  items-center space-x-2">
        <img src={footer_logo} alt="Logo" className="h-10" />
        <h1 className="text-xl   ml-12 sm:ml-6 font-bold">Book Store</h1>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Middle Section - Admin Name (Hidden on Small Screens) */}
      <div className="hidden md:block text-lg font-semibold">Admin</div>

      {/* Right Section - Notifications & Logout */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="relative p-2 rounded hover:bg-gray-700">
          <Bell size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
            3
          </span>
        </button>
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 p-4 md:hidden flex flex-col space-y-4">
          <div className="text-lg font-semibold text-center">Admin</div>
          <button className="relative p-2 rounded hover:bg-gray-700 flex items-center justify-center">
            <Bell size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
              3
            </span>
          </button>
          <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center space-x-2">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
