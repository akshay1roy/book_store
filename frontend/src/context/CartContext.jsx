import { createContext, useState } from "react";

// Create cart context
export const CartContext = createContext();

// Cart provider component
export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                // If item exists, increase the quantity
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            // Otherwise, add a new item with quantity 1
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (data) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== data._id));
    };

    const value = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Export the provider
export default CartContextProvider;
