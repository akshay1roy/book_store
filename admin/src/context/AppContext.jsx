import { createContext, useState } from "react";

export const AppContext=createContext();

const AppContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [books,setBooks]=useState([])

    

    const value={
        books,
        setBooks,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.value}
        </AppContext.Provider>
    )
}

export default AppContextProvider;