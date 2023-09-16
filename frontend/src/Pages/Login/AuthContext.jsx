import React, { useState, useEffect, createContext } from "react";
import { axiosInstance } from "../../axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("account/user");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
