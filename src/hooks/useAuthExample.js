import axios from "axios";

const useBookAPI = () => {
  const BASE_URL = "https://bookapp-psql.vercel.app/api/books";

  // Obtener todos los libros
  const getAllBooks = async () => {
    try {
      const response = await axios.get(BASE_URL);
      console.log("Todos los libros:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener libros:", error);
      throw error;
    }
  };

  // Obtener libro por ID
  const getBookById = async (bookId) => {
    try {
      const url = `${BASE_URL}/${bookId}`;
      const response = await axios.get(url);
      console.log("Libro por ID:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al obtener libro por ID:", error);
      throw error;
    }
  };

  // Crear nuevo libro
  const createBook = async (bookData) => {
    try {
      const response = await axios.post(BASE_URL, bookData);
      console.log("Libro creado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al crear libro:", error);
      throw error;
    }
  };

  // Actualizar libro
  const updateBook = async (bookId, bookData) => {
    try {
      const url = `${BASE_URL}/${bookId}`;
      const response = await axios.put(url, bookData);
      console.log("Libro actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar libro:", error);
      throw error;
    }
  };

  // Eliminar libro
  const deleteBook = async (bookId) => {
    try {
      const url = `${BASE_URL}/${bookId}`;
      const response = await axios.delete(url);
      console.log("Libro eliminado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar libro:", error);
      throw error;
    }
  };

  return {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
  };
};

export default useBookAPI;
