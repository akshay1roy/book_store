import React from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold text-white">About Us</h3>
          <p className="mt-3 text-gray-400">
            Discover the best books, top-rated reads, and must-have literature.
            Your next adventure starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `transition ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="mt-3 flex justify-center md:justify-start space-x-5">
            <a href="#" className="hover:text-yellow-400 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center text-gray-500">
        © {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
}
