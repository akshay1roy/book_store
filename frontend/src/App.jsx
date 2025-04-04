import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import OrderPage from "./pages/OrderPage";
import SingleBook from "./pages/SingleBook";
import Footer from "./components/Footer";
import CardPage from "./pages/CardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Signup from "./pages/Signup";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div>
       <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="books/:category" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CardPage/>}/>
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-orders" element={<OrderPage />} />
        <Route path="/book/:bookId" element={<SingleBook />} />
        <Route path="/check-out" element={<CheckoutPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
