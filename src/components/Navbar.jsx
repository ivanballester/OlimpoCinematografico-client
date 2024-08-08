import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const { isLoggedIn, authenticateUser, isAdmin } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" width={80} />
      </Link>
      <h4>Peliculas</h4>
      {!isLoggedIn && (
        <Link to="/signup" className="no-underline">
          <h4>Registro</h4>
        </Link>
      )}
      {!isLoggedIn && (
        <Link to="/login" className="no-underline">
          <h4>Acceso</h4>
        </Link>
      )}
      {isLoggedIn && (
        <button onClick={handleLogout}>
          <span>Cerrar sesión</span>
        </button>
      )}
      {/* {isLoggedIn && <Link onClick={handleLogout} to="/login"><span>Cerrar sesión</span></Link> } */}
      {isAdmin && (
        <Link to="/admin" className="no-underline">
          Panel de control
        </Link>
      )}
    </nav>
  );
}
