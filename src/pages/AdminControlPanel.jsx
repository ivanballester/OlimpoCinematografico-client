import React, { useEffect, useState } from "react";
import service from "../service/service.config";

function AdminControlPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const allUsers = await service.get("/users");
        console.log(allUsers.data);
        setUsers(allUsers.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      {users.map((user, i) => {
        return (
          <div key={i} className="user-card">
            <p>Email:{user.email}</p>
            <p>Nombre:{user.name[0].toUpperCase() + user.name.slice(1)}</p>
            <p>Rol:{user.role}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AdminControlPanel;
