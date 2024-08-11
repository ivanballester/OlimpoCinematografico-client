import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import HomePage from "./pages/HomePage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AdminControlPanel from "./pages/AdminControlPanel";
import ReviewsPage from "./pages/ReviewsPage";
import ReviewAdd from "./pages/ReviewAdd";
import ReviewDetails from "./pages/ReviewDetails";

import Navbar from "./components/Navbar";
import Admin from "./components/Auth/Admin";

function App() {
  return (
    <div>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/:movieId" element={<ReviewDetails />} />
        <Route
          path="/admin/control-panel"
          element={
            <Admin>
              <AdminControlPanel />
            </Admin>
          }
        />
        <Route
          path="/admin/new-review"
          element={
            <Admin>
              <ReviewAdd />
            </Admin>
          }
        />

        {/* error FE routes here... */}
      </Routes>
    </div>
  );
}

export default App;
