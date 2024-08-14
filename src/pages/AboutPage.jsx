import React from "react";
import foto from "../assets/foto.png";
import logo1 from "../assets/linkedin.svg.png";
import logo2 from "../assets/github.png";
import Footer from "../components/Footers";

const AboutMe = () => {
  return (
    <div className="about-me">
      <header>
        <div className="name">
          <h2>Iván Ballester</h2>
          <img src={foto} alt="foto" width={200} />
          <br />
          <a
            href="https://www.linkedin.com/in/ivanballester/"
            style={{ textDecoration: "none", color: "rgb(85, 144, 149)" }}
            target="_blank"
          >
            <img src={logo1} alt="" width={20} /> LinkedIn
          </a>
          <a
            href="https://github.com/ivanballester"
            style={{ textDecoration: "none", color: "rgb(85, 144, 149)" }}
            target="_blank"
          >
            <img src={logo2} alt="" width={20} /> GitHub
          </a>
        </div>
      </header>

      <section id="about" className="about-section">
        <h1 style={{ color: "rgb(85, 144, 149)" }}>Sobre mí</h1>
        <p>
          ¡Hola! Soy Iván Ballester, un apasionado desarrollador web con un
          enfoque en crear sitios web atractivos y fáciles de usar. He diseñado
          este sitio web en particular para mostrar mis habilidades y mi amor
          por la crítica de películas.
        </p>
        <p>
          Mi objetivo es construir sitios web que no solo se vean bien, sino que
          también ofrezcan una excelente experiencia de usuario.
        </p>

        <h2 style={{ color: "rgb(85, 144, 149)" }}>Sobre este sitio web</h2>
        <p>
          Este sitio está dedicado a las reseñas y críticas de películas. Lo
          creé para proporcionar una plataforma para que los entusiastas del
          cine exploren reseñas detalladas y calificaciones. El diseño se enfoca
          en una apariencia limpia y moderna, facilitando a los usuarios la
          navegación y la búsqueda de la información que necesitan.
        </p>

        <h2 style={{ color: "rgb(85, 144, 149)" }}>Habilidades</h2>
        <ul>
          <li>Desarrollo Web</li>
          <li>Tecnologías Front-end (HTML, CSS, JavaScript)</li>
          <li>Tecnologías Back-end (Express.js, Node.js, MongoDB)</li>
          <li>Librerías: React</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default AboutMe;
