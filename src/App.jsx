import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import HomePage from "./pages/HomePage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/admin"
          element={
            <Admin>
              {" "}
              <PaginaAdmin />{" "}
            </Admin>
          }
        /> */}

        {/* error FE routes here... */}
      </Routes>
    </div>
  );
}

export default App;
