import React from "react";
import f from "../assets/fb.svg";
import x from "../assets/x.svg";
import ig from "../assets/ig.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📩 truefilms@truefilms.com</p>
          <p>☎️ +34 123 456 789</p>
          <p>📌 03008 Alicante, España</p>
        </div>
        <div className="footer-section">
          <h4 style={{ marginBottom: "20px" }}>Síguenos</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={f} alt="" width={30} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <img src={x} alt="" width={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={ig} alt="" width={30} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 truefilms. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
