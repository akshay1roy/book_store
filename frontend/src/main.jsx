import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import UserAppContextProvider from "./context/UserAppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserAppContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
      </UserAppContextProvider>
  </BrowserRouter>
);
