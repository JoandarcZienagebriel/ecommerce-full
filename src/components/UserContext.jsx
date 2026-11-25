import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("authToken")
    );
console.log("Token from localStorage:", token);


    return (
        <UserContext.Provider value={{
            token,
            setToken
        }}>
            {children}
        </UserContext.Provider>
    );
};