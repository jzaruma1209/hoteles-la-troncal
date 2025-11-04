import { useState, useEffect } from "react";

// Custom hook para manejar el estado de autenticación
const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [userLogged, setUserLogged] = useState(() => {
    const user = localStorage.getItem("userLogged");
    return user ? JSON.parse(user) : null;
  });

  const updateAuthStatus = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userLogged");

    setIsAuthenticated(!!token);
    setUserLogged(user ? JSON.parse(user) : null);
  };

  useEffect(() => {
    // Evento personalizado para detectar cambios de autenticación
    const handleAuthChange = () => {
      updateAuthStatus();
    };

    // Escuchar cambios desde otras pestañas/ventanas
    const handleStorage = (e) => {
      if (e.key === "token" || e.key === "userLogged") {
        updateAuthStatus();
      }
    };

    // Agregar listeners
    window.addEventListener("authStatusChanged", handleAuthChange);
    window.addEventListener("storage", handleStorage);

    // Cleanup
    return () => {
      window.removeEventListener("authStatusChanged", handleAuthChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userLogged", JSON.stringify(user));
    updateAuthStatus();
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent("authStatusChanged"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogged");
    updateAuthStatus();
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent("authStatusChanged"));
  };

  return {
    isAuthenticated,
    userLogged,
    login,
    logout,
    updateAuthStatus,
  };
};

export default useAuthStatus;
