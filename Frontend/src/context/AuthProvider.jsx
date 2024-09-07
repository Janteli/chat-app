import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Getting user data from cookies or localStorage
  const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp");

  // Parse the user data and store it in the state if available
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);
