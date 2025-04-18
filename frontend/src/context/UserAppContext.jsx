import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const UserAppContext = createContext();

const UserAppContextProvider = ({ children }) => {
  const backendUrl = "https://book-store-backend-5r0n.onrender.com";

  const [books, setBooks] = useState([]);
  const [userId,SetUserId]=useState(null)

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken && storedToken !== "undefined" && storedToken !== "false"
      ? storedToken
      : "";
  });
  
  // const [token,setToken]=useState(localStorage.getItem('token')|| '');

  // console.log("token",token);


  const getAllBooks = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/book/get-all-books`);

      // console.log(data);
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      //  console.log(data.userData._id);
      if (data.success) {
        SetUserId(data.userData._id);
      } else if(data.success==false && token) {
        toast.error("Unable to fetch user profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };




  useEffect(()=>{
    getAllBooks();
    // fetchUserDetails()
  },[])


  useEffect(() => {
    localStorage.setItem("token", token);
    fetchUserDetails()
  }, [token]);

  const value = {
    backendUrl,
    books,
    getAllBooks,
    token,
    setBooks,setToken,
    userId
  };

  return (
    <UserAppContext.Provider value={value}>{children}</UserAppContext.Provider>
  );
};

export default UserAppContextProvider;
