import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useAuthStatus from "../../hooks/useAuthStatus";
import "./styles/Header.css";
// Fix: Trabajando en hamburger menu - rama bugfix
const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, userLogged, logout } = useAuthStatus();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const handleToggleDarkMode = () => {
    toggleTheme();
  };

  return (
    <header className={`header ${isDarkMode ? "dark-mode" : ""}`}>
      <h1 className="header__logo">
        <Link to="/">
          Academlo
          <span className="header__hotel">Hotels</span>
        </Link>
      </h1>

      {/* Desktop Navigation */}
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="header__item">
                <Link to="/reservations">Mis Reservas</Link>
              </li>
              <li className="header__item">
                <Link to="/profile">Perfil</Link>
              </li>
              <li className="header__item">
                <button onClick={handleLogout} className="header__logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="header__item">
                <Link to="/register">Register</Link>
              </li>
              <li className="header__item">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
        {/* Dark Mode Toggle Button for Desktop */}
        <button onClick={handleToggleDarkMode} className="header__dark-toggle">
          <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"}`}></i>
        </button>
      </nav>

      {/* Mobile Controls Container */}
      <div className="header__mobile-controls">
        {/* Mobile Menu Button */}
        <button onClick={handleMenu} className="header__menu">
          <i className="bx bx-menu"></i>
        </button>

        {/* Dark Mode Toggle Button */}
        <button onClick={handleToggleDarkMode} className="header__dark-toggle">
          <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"}`}></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`header__nav-mobile ${isOpenMenu ? "active" : ""}`}>
        <ul className="header__list-mobile">
          <li className="header__item-mobile">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="header__item-mobile">
                <Link to="/reservations" onClick={closeMenu}>
                  Mis Reservas
                </Link>
              </li>
              <li className="header__item-mobile">
                <Link to="/profile" onClick={closeMenu}>
                  Perfil
                </Link>
              </li>
              <li className="header__item-mobile">
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="header__logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="header__item-mobile">
                <Link to="/register" onClick={closeMenu}>
                  Register
                </Link>
              </li>
              <li className="header__item-mobile">
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
