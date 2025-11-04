import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode, toggleDarkMode } from "../store/slices/darkMode.slice";

const useTheme = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  // Aplicar el tema al body cuando cambie
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Solo cambiar si no hay preferencia guardada del usuario
      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme === null) {
        dispatch(setDarkMode(e.matches));
      }
    };

    // Solo agregar el listener si no hay preferencia guardada
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === null) {
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [dispatch]);

  return {
    isDarkMode,
    toggleTheme: () => dispatch(toggleDarkMode()),
    setTheme: (theme) => dispatch(setDarkMode(theme)),
  };
};

export default useTheme;
