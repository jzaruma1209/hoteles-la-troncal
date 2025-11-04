// Función utilitaria para manejar el logout de forma consistente
const handleTokenExpiration = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogged");
  // Disparar evento personalizado para actualizar la UI
  window.dispatchEvent(new CustomEvent("authStatusChanged"));
};

export default handleTokenExpiration;
