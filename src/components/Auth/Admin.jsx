import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function Admin(props) {
  const { isAdmin } = useContext(AuthContext);

  if (isAdmin) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default Admin;
