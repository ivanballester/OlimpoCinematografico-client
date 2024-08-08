import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../service/service.config";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleconfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const newUser = {
      email,
      name,
      password,
    };

    // ... contactar al backend para registrar al usuario aqui

    try {
      await service.post("/auth/signup", newUser);

      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // aqui deberiamos hacer un navigate a pagina de error si hay fallo del servidor
      }
    }
  };

  return (
    <div>
      <h1>REGISTRO</h1>
      <div>
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

          <button type="submit">Registrar</button>

          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
