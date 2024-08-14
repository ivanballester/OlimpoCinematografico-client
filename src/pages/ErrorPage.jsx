import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>500 - Error Interno del Servidor</h1>
      <p>Lo siento, ha ocurrido un error en el servidor.</p>
      <Link to="/" style={{ color: "black" }}>
        Volver a la página de inicio
      </Link>
    </div>
  );
}

export default ErrorPage;
