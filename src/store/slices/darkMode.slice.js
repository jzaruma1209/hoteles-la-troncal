import { createSlice } from "@reduxjs/toolkit";

// Función para obtener el tema desde localStorage o usar el del sistema
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme !== null) {
    return JSON.parse(savedTheme); // true o false guardado
  }
  // Si no hay tema guardado, usar la preferencia del sistema
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    isDarkMode: getInitialTheme(), // Cargar tema inicial
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Guardar en localStorage cada vez que cambie
      localStorage.setItem("darkMode", JSON.stringify(state.isDarkMode));
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      // Guardar en localStorage
      localStorage.setItem("darkMode", JSON.stringify(action.payload));
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
