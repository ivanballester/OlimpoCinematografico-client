import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../service/service.config";
import { AuthContext } from "../../context/auth.context";

function Signup() {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleconfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const newUser = {
      email,
      name,
      password,
    };

    try {
      const response = await service.post("/auth/signup", newUser);

      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.errorMessage);
      } else {
        setError("Error del servidor, intenta más tarde");
      }
    }
  };

  return (
    <div className="signup-form">
      <h1 style={{ textAlign: "center" }}>REGISTRO</h1>
      <form onSubmit={handleSignup}>
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
          <label>Nombre</label>

          <input
            type="text"
            name="Name"
            value={name}
            onChange={handleNameChange}
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
        <div className="signup-inputs">
          <label>Repetir contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleconfirmPasswordChange}
          />
        </div>
        <br />

        <button type="submit" className="signup-login-button">
          Registrar
        </button>

        {error && typeof error === "string" && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
