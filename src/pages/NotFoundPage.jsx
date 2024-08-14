import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" style={{ color: "black" }}>
        Volver a la página de inicio
      </Link>
    </div>
  );
}

export default NotFoundPage;
