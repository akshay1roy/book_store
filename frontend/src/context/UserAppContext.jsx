import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const UserAppContext = createContext();

const UserAppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/book/get-all-books`);

    //   console.log(response);
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    getAllBooks();
  },[])

  const value = {
    backendUrl,
    books,
    getAllBooks,
    setBooks,
  };

  return (
    <UserAppContext.Provider value={value}>{children}</UserAppContext.Provider>
  );
};

export default UserAppContextProvider;
