import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginAdmin } from "../redux/actions/adminActions";

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const navigate= useNavigate()
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });
      console.log(data)
      if (data.success) {
        toast.success("Login Successfully");
        localStorage.setItem('aToken',data.atoken)

        setAToken(data.atoken);
      } else {
        toast.error("Login Failed . please check your credentials");
      }

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    // const success = await dispatch(loginAdmin(email, password));
    // if (success) navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 cursor-pointer text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
