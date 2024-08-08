import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProviderWrapper>
    <BrowserRouter>
      <App />/
    </BrowserRouter>
  </AuthProviderWrapper>
);
