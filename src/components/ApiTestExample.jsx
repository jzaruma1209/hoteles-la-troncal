import React, { useState } from "react";
import useAuthExample from "../hooks/useAuthExample";

const ApiTestExample = () => {
  const [token, setToken] = useState(null);

  const {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
  } = useAuthExample();

  // Función para probar obtener todos los usuarios
  const handleGetAllUsers = async () => {
    if (!token) {
      console.error("Necesitas hacer login primero para obtener el token");
      alert("Haz login primero para obtener el token");
      return;
    }

    try {
      const users = await getAllUsers(token);
      console.log("Lista de usuarios obtenida:", users);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para probar obtener usuario por ID
  const handleGetUserById = async () => {
    if (!token) {
      console.error("Necesitas hacer login primero para obtener el token");
      alert("Haz login primero para obtener el token");
      return;
    }

    try {
      const user = await getUserById(2, token); // Cambiar por el ID que quieras probar
      console.log("Usuario obtenido:", user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para probar crear usuario
  const handleCreateUser = async () => {
    const newUser = {
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@example.com",
      password: "123456",
      gender: "male",
    };

    try {
      const user = await createUser(newUser);
      console.log("Usuario creado:", user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para probar login
  const handleLogin = async () => {
    const credentials = {
      email: "juan.perez@example.com",
      password: "123456",
    };

    try {
      const loginResponse = await loginUser(credentials);
      console.log("Login exitoso:", loginResponse);

      // Guardar el token para usarlo en otras peticiones
      if (loginResponse.token) {
        setToken(loginResponse.token);
        console.log("Token guardado:", loginResponse.token);
        alert("Login exitoso! Ahora puedes obtener usuarios.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para actualizar usuario
  const handleUpdateUser = async () => {
    if (!token) {
      alert("Haz login primero para obtener el token");
      return;
    }

    // Cambia este ID por el que quieras actualizar
    const userId = 838; // Tu usuario creado
    const updatedData = {
      firstName: "Juan Carlos",
      lastName: "Pérez Actualizado",
      email: "juan.perez@example.com",
      gender: "male",
    };

    try {
      const result = await updateUser(userId, updatedData, token);
      console.log("Usuario actualizado:", result);
      alert("Usuario actualizado exitosamente!");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar usuario");
    }
  };

  // Función para eliminar usuario
  const handleDeleteUser = async () => {
    if (!token) {
      alert("Haz login primero para obtener el token");
      return;
    }

    // ⚠️ CAMBIAR ESTE ID POR EL QUE QUIERAS ELIMINAR
    const userId = prompt("Ingresa el ID del usuario a eliminar:");

    if (!userId) {
      alert("Operación cancelada");
      return;
    }

    const confirmDelete = confirm(
      `¿Estás seguro de eliminar el usuario con ID ${userId}?`
    );

    if (!confirmDelete) {
      alert("Operación cancelada");
      return;
    }

    try {
      const result = await deleteUser(userId, token);
      console.log("Usuario eliminado:", result);
      alert("Usuario eliminado exitosamente!");
    } catch (error) {
      console.error("Error al eliminar:", error);
      if (error.response?.status === 403) {
        alert("Error: No tienes permisos para eliminar este usuario");
      } else {
        alert("Error al eliminar usuario");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pruebas de API - Usuarios</h2>

      {/* Mostrar estado del token */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <p>
          <strong>Estado del Token:</strong>{" "}
          {token ? "✅ Autenticado" : "❌ No autenticado"}
        </p>
        {token && (
          <p style={{ fontSize: "12px", wordBreak: "break-all" }}>
            Token: {token.substring(0, 50)}...
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <button
          onClick={handleLogin}
          style={{ backgroundColor: "#4CAF50", color: "white" }}
        >
          1. Login de Usuario (Obtener Token)
        </button>

        <button onClick={handleGetAllUsers} disabled={!token}>
          2. Obtener Todos los Usuarios
        </button>

        <button onClick={handleGetUserById} disabled={!token}>
          3. Obtener Usuario por ID (ID: 1)
        </button>

        <button onClick={handleCreateUser}>4. Crear Nuevo Usuario</button>

        <hr style={{ margin: "20px 0", border: "1px solid #ccc" }} />

        <button
          onClick={handleUpdateUser}
          disabled={!token}
          style={{ backgroundColor: "#FF9800", color: "white" }}
        >
          5. Actualizar Usuario (ID: 838)
        </button>

        <button
          onClick={handleDeleteUser}
          disabled={!token}
          style={{ backgroundColor: "#f44336", color: "white" }}
        >
          6. 🗑️ Eliminar Usuario (Ingresa ID)
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
        }}
      >
        <h4>📋 Pasos para eliminar un usuario:</h4>
        <ol>
          <li>Haz login para obtener el token</li>
          <li>Obtén todos los usuarios para ver los IDs disponibles</li>
          <li>Copia un ID de la consola</li>
          <li>Haz clic en "Eliminar Usuario" e ingresa el ID</li>
          <li>Confirma la eliminación</li>
        </ol>
        <p>
          <strong>⚠️ Nota:</strong> Solo puedes eliminar TU propio usuario (ID:
          838) o usuarios que hayas creado.
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Nota:</strong> Abre la consola del navegador (F12) para ver
          las respuestas de la API.
        </p>
      </div>
    </div>
  );
};

export default ApiTestExample;
