import React, { createContext, useEffect, useState } from "react";
import service from "../service/service.config";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const authenticateUser = async () => {
    console.log("intentando validar el token");

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      setIsAdmin(false);
      return;
    }

    try {
      const response = await service.get("/auth/verify");
      console.log(response);
      setIsLoggedIn(true);
      setIsLoading(false);
      setUser(response.data._id);

      if (response.data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      setIsAdmin(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
    isAdmin,
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  if (isLoading) {
    return <h3>... validando credenciales</h3>;
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
