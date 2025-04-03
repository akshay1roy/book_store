import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { UserAppContext } from "../context/UserAppContext";

const Navbar = () => {
  const {token, setToken}= useContext(UserAppContext)
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [token, setToken] = useState(true);
  const dropdownRef = useRef(null);

  const { cart } = useContext(CartContext);

  const cartItemCount = cart.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout=()=>{
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <nav className="bg-blue-500 text-white shadow-md px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center  font-bold text-2xl">
          {/* <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" /> */}
          BookStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg  font-semibold text-white">
          <Link to="/" className="hover:text-gray-100">
            Home
          </Link>
          <Link to="/books" className="hover:text-gray-100">
            Books
          </Link>
          <Link to="/about" className="hover:text-gray-100">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-100">
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart
              size={24}
              className="text-white  font-bold hover:text-blue-100"
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Authentication */}
          {!token ? (
            <div>
              <Link
                to="/login"
                className="bg-blue-500 text-white border-2 border-r-amber-100 px-4 py-2 mr-2 rounded-xl cursor-pointer"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-white text-blue-700 px-4 py-2 rounded-xl cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Icon */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 cursor-pointer "
              >
                <User size={24} className="hover:text-gray-100" />
                <span className="text-white text-xl  hover:text-gary-100">
                  Profile
                </span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="absolute right-0  mt-2 w-40 z-190 bg-white shadow-md rounded border ">
                  <li>
                    <Link
                      to="/my-profile"
                      className=" text-gray-700 mt-1 block px-4 py-2 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className=" text-gray-700 mt-1 block px-4 py-2 hover:bg-gray-100"
                    >
                      Cards
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-orders"
                      className=" text-gray-700 mt-1 block px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                  </li>

                  <li>
                    <button
                      className="w-full text-left px-4 py-2 mt-1 text-red-600 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden cursor-pointer text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 z-100 right-0 w-72 h-full bg-blue-500 shadow-md p-5 transition-transform transform duration-300 ease-in-out ">
          <button
            className="absolute top-3 right-3 text-white font-bold transition duration-300 cursor-pointer "
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>

          <div className="mt-12 space-y-6 flex flex-col items-center ">
            <Link
              to="/"
              className="block font-bold text-white hover:text-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/books"
              className="block font-bold text-white hover:text-gray-100 "
              onClick={() => setMenuOpen(false)}
            >
              Books
            </Link>
            <Link
              to="/about"
              className="block font-bold text-white hover:text-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block font-bold text-white hover:text-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center font-bold text-white hover:text-gray-100"
            >
              <ShoppingCart size={24} className="mr-2" /> Cart
              {cartItemCount > 0 && (
                <span className="ml-2 bg-red-600 font-bold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {!token ? (
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block bg-white text-blue-700 rounded-xl px-4  py-2  text-center"
              >
                Create Account
              </Link>
            ) : (
              <>
                <Link
                  to="/my-profile"
                  onClick={() => setMenuOpen(false)}
                  className="block font-bold text-white hover:text-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/my-orders"
                  onClick={() => setMenuOpen(false)}
                  className="block font-bold text-white hover:text-gray-100"
                >
                  My Orders
                </Link>
                <button
                  className="w-full text-center cursor-pointer  bg-white rounded-xl font-bold text-red-600  hover:bg-gray-100 px-4 py-2"
                  onClick={() => setToken(false)}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
