import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);
  const backendUrl = "https://book-store-backend-5r0n.onrender.com";

  const [books,setBooks]=useState([])
  const [singleBook,setSingleBook]=useState(null)


  const getAllBooks=async()=>{
    try {
        const {data}= await axios.get(backendUrl+'/api/book/get-all-books',{},{headers:{aToken}})
        if(data.success)
        {
            // console.log(data);
            setBooks(data.books)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  const getSingleBook=async(id)=>{
    try {
        const {data}= await axios.get(`${backendUrl}/api/book/get-book/${id}`,{},{headers:{aToken}})
        
        // console.log(data);
        setSingleBook(data.book)


    } catch (error) {
        console.log(error.message)
    }
  }


  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken"); // Remove token on logout
    }
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    books,
    backendUrl,
    getAllBooks,
    getSingleBook,
    singleBook
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider
