import React, { useEffect, useState } from "react";
import service from "../service/service.config";
import logo from "../assets/user.png";
import Pagination from "../components/pagination";
import user1 from "../assets/user1.png";

function AdminControlPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const allUsers = await service.get("/users");
        setUsers(allUsers.data);
      } catch (error) {
        console.log("Failed to load users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // Pagination calc
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleDelete = async (userId) => {
    try {
      await service.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log("Failed to delete user:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="page-container">
      {currentUsers.map((user, i) => (
        <div key={i} className="user-card">
          <div>
            <p>📧 {user.email}</p>
            <p>🧑🏻‍💻 {user.name[0].toUpperCase() + user.name.slice(1)}</p>
            <p>📋 {user.role}</p>
          </div>
          <div className="user1">
            <img src={user1} alt="logo" width={100} />
            {user.role !== "admin" && (
              <button
                onClick={() => handleDelete(user._id)}
                style={{ backgroundColor: "rgb(165, 137, 103)" }}
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </div>
  );
}

export default AdminControlPanel;
