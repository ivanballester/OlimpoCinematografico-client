import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../service/service.config";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      name,
      password,
    };

    // ... contactar al backend para registrar al usuario aqui

    try {
      // await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, newUser)
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
      <h1>Formulario de Registro</h1>

      <form onSubmit={handleSignup}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Name:</label>
        <input
          type="text"
          name="Name"
          value={name}
          onChange={handleNameChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Registrar</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Signup;
