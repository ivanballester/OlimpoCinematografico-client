import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.jpg";
import logout from "../assets/logout.png";
import menu from "../assets/menu.png";

export default function Navbar() {
  const { isLoggedIn, authenticateUser, isAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  console.log(isLoggedIn);

  return (
    <nav className="navbar">
      <img
        src={menu}
        alt="menu"
        onClick={handleToggleMenu}
        className="burger"
      />

      <Link to="/">
        <img src={logo} alt="logo" width={80} className="nav-img" />
      </Link>
      {isLoggedIn && (
        <img src={logout} alt="logout" width={30} onClick={handleLogout} />
      )}
      {isOpen && (
        <div className="menu">
          <button onClick={handleToggleMenu} className="close-button">
            X
          </button>
          <Link to="/movies" className="menu-item" onClick={handleToggleMenu}>
            <h4>Peliculas</h4>
          </Link>

          {!isLoggedIn && (
            <Link to="/signup" className="menu-item" onClick={handleToggleMenu}>
              <h4>Registro</h4>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="menu-item" onClick={handleToggleMenu}>
              <h4>Acceso</h4>
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="menu-item" onClick={handleToggleMenu}>
              Panel de control
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="menu-item" onClick={handleToggleMenu}>
              Añadir critica
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
