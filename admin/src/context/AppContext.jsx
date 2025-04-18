import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);

  const backendUrl = "https://book-store-backend-5r0n.onrender.com";

  const [users, setUsers] = useState([]);

  const getAllUser = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-all-user", {
        headers: { aToken },
      });

      // console.log(aToken);
      // console.log(response)

      if (data.success) {
        // toast.success('success');
        setUsers(data.userData);
      } else {
        toast.error("Doesn't fetch user");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    users,
    setUsers,
    backendUrl,
    getAllUser,
    setAToken,
  };

  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
      getAllUser();
    } else {
      localStorage.removeItem("aToken"); // Remove token on logout
    }
  }, [aToken]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
