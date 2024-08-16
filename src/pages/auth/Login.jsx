import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await service.post("/auth/login", userCredentials);

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="signup-form">
      <h1 style={{ textAlign: "center" }}>INICIAR SESIÓN</h1>

      <form onSubmit={handleLogin}>
        <div className="signup-inputs">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <br />
        <div className="signup-inputs">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <br />
        <button type="submit">Acceder</button>
        <div style={{ textAlign: "center" }}>
          <p> ¿No tienes cuenta?</p>
          <Link to={"/signup"} style={{ color: "black" }}>
            Regístrate aquí
          </Link>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
