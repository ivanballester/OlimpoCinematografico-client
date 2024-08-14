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

      <Link to="/" className="brand">
        <img src={logo} alt="logo" width={80} className="nav-img" />
      </Link>
      {isLoggedIn && (
        <img src={logout} alt="logout" width={30} onClick={handleLogout} />
      )}
      {isOpen && (
        <div className="menu">
          <button onClick={handleToggleMenu} className="close-button">
            ✘
          </button>
          <Link to="/" className="menu-item" onClick={handleToggleMenu}>
            <h4>⊹ PÁGINA PRINCIPAL</h4>
          </Link>
          <Link to="/reviews" className="menu-item" onClick={handleToggleMenu}>
            <h4>⊹ PELÍCULAS</h4>
          </Link>

          {!isLoggedIn && (
            <Link to="/signup" className="menu-item" onClick={handleToggleMenu}>
              <h4>⊹ HOME</h4>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="menu-item" onClick={handleToggleMenu}>
              <h4> ⊹ INICIAR SESIÓN ⊹</h4>
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/control-panel"
              className="menu-item"
              onClick={handleToggleMenu}
            >
              <h4> ⊹ USUARIOS</h4>
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/new-review"
              className="menu-item"
              onClick={handleToggleMenu}
            >
              <h4> ⊹ NUEVA CRÍTICA</h4>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/login" className="menu-item" onClick={handleToggleMenu}>
              <h4> ⊹ CERRAR SESIÓN </h4>
            </Link>
          )}
          <Link to="/aboutme" className="menu-item" onClick={handleToggleMenu}>
            <h4>⊹ SOBRE MI</h4>
          </Link>
        </div>
      )}
    </nav>
  );
}
