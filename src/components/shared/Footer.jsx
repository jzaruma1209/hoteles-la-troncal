import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import "./styles/Footer.css";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="footer__container">
        {/* Sección de la aplicación */}
        <div className="footer__section">
          <div className="footer__logo">
            <h3>
              Academlo
              <span className="footer__hotel">Hotels</span>
            </h3>
            <p className="footer__description">
              La mejor plataforma para encontrar y reservar hoteles increíbles
              alrededor del mundo. Experiencias únicas te esperan.
            </p>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer__section">
          <h4 className="footer__title">Enlaces Rápidos</h4>
          <ul className="footer__links">
            <li>
              <Link to="/" className="footer__link">
                <i className="bx bx-home-alt"></i>
                Home
              </Link>
            </li>
            <li>
              <Link to="/reservations" className="footer__link">
                <i className="bx bx-calendar-check"></i>
                Mis Reservas
              </Link>
            </li>
            <li>
              <Link to="/profile" className="footer__link">
                <i className="bx bx-user"></i>
                Mi Perfil
              </Link>
            </li>
            <li>
              <Link to="/login" className="footer__link">
                <i className="bx bx-log-in"></i>
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>

        {/* Información del desarrollador */}
        <div className="footer__section">
          <h4 className="footer__title">Desarrollado por</h4>
          <div className="footer__developer">
            <div className="developer__info">
              <h5 className="developer__name">Paul Zaruma</h5>
              <p className="developer__title">Freelance Full Stack Developer</p>
              <div className="developer__contact">
                <a
                  href="mailto:jzaruma1209@gmail.com"
                  className="footer__contact-link"
                >
                  <i className="bx bx-envelope"></i>
                  jzaruma1209@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="footer__section">
          <h4 className="footer__title">Sígueme</h4>
          <div className="footer__social">
            <a
              href="https://linkedin.com/in/paul-zaruma"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <i className="bx bxl-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/paul-zaruma"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <i className="bx bxl-github"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://portfolio-paul-zaruma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Portfolio"
            >
              <i className="bx bx-briefcase"></i>
              <span>Portfolio</span>
            </a>
            <a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="WhatsApp"
            >
              <i className="bx bxl-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="footer__divider"></div>

      {/* Copyright */}
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer__copyright">
            <p>
              © {new Date().getFullYear()} AcademloHotels. Todos los derechos
              reservados.
            </p>
            <p className="footer__credits">
              Desarrollado con ❤️ por{" "}
              <a
                href="mailto:jzaruma1209@gmail.com"
                className="footer__credit-link"
              >
                Paul Zaruma
              </a>
            </p>
          </div>
          <div className="footer__tech">
            <span className="tech-badge">
              <i className="bx bxl-react"></i>
              React
            </span>
            <span className="tech-badge">
              <i className="bx bxl-redux"></i>
              Redux
            </span>
            <span className="tech-badge">
              <i className="bx bx-code"></i>
              Vite
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
