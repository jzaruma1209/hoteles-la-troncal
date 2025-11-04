import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuthStatus from "../hooks/useAuthStatus";
import useCrud from "../hooks/useCrud";
import "./styles/ProfilePage.css";

const ProfilePage = () => {
  const { userLogged, updateAuthStatus } = useAuthStatus();
  const [activeTab, setActiveTab] = useState("info");
  const [userStats, setUserStats] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [, getData] = useCrud();

  useEffect(() => {
    if (userLogged) {
      // Pre-llenar el formulario con datos del usuario
      setValue("firstName", userLogged.firstName);
      setValue("lastName", userLogged.lastName);
      setValue("email", userLogged.email);
      setValue("gender", userLogged.gender);

      // TODO: Cambiar estas URLs cuando implementes tu propia API
      loadUserStats();
      loadUserReviews();
      loadBookingHistory();
    }
  }, [userLogged, setValue]);

  const loadUserStats = async () => {
    try {
      // TODO: Endpoint para estadísticas del usuario
      // const url = `${API_BASE_URL}/users/${userLogged.id}/stats`;
      // const stats = await getData(url, true);
      // setUserStats(stats);

      // Datos de ejemplo mientras tanto
      setUserStats({
        totalBookings: 12,
        totalSpent: 2450.0,
        favoriteCity: "París",
        memberSince: "2023-01-15",
      });
    } catch (error) {
      console.error("Error loading user stats:", error);
    }
  };

  const loadUserReviews = async () => {
    try {
      // TODO: Endpoint para reseñas del usuario
      // const url = `${API_BASE_URL}/users/${userLogged.id}/reviews`;
      // const reviews = await getData(url, true);
      // setUserReviews(reviews);

      // Datos de ejemplo
      setUserReviews([
        {
          id: 1,
          hotelName: "Hotel Paradise",
          rating: 5,
          comment: "Excelente servicio y ubicación perfecta",
          date: "2024-08-15",
        },
        {
          id: 2,
          hotelName: "City Center Hotel",
          rating: 4,
          comment: "Muy buena relación calidad-precio",
          date: "2024-07-20",
        },
      ]);
    } catch (error) {
      console.error("Error loading user reviews:", error);
    }
  };

  const loadBookingHistory = async () => {
    try {
      // TODO: Endpoint para historial de reservas del usuario
      // const url = `${API_BASE_URL}/users/${userLogged.id}/bookings/history`;
      // const history = await getData(url, true);
      // setBookingHistory(history);

      // Datos de ejemplo
      setBookingHistory([
        {
          id: 1,
          hotelName: "Hotel Paradise",
          checkIn: "2024-08-10",
          checkOut: "2024-08-15",
          status: "completed",
          total: 450.0,
        },
        {
          id: 2,
          hotelName: "City Center Hotel",
          checkIn: "2024-12-20",
          checkOut: "2024-12-25",
          status: "confirmed",
          total: 320.0,
        },
      ]);
    } catch (error) {
      console.error("Error loading booking history:", error);
    }
  };

  const onSubmitPersonalInfo = async (data) => {
    try {
      // TODO: Endpoint para actualizar información personal
      // const url = `${API_BASE_URL}/users/${userLogged.id}`;
      // await updateData(url, data, userLogged.id, true);

      console.log("Datos a actualizar:", data);
      alert(
        "Información actualizada correctamente (funcionalidad pendiente de API)"
      );
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("Error al actualizar la información");
    }
  };

  const onSubmitPasswordChange = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // TODO: Endpoint para cambiar contraseña
      // const url = `${API_BASE_URL}/users/${userLogged.id}/change-password`;
      // await updateData(url, { currentPassword: data.currentPassword, newPassword: data.newPassword }, userLogged.id, true);

      console.log("Cambio de contraseña solicitado");
      alert(
        "Contraseña actualizada correctamente (funcionalidad pendiente de API)"
      );
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error al cambiar la contraseña");
    }
  };

  if (!userLogged) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <h2>Acceso Denegado</h2>
          <p>Debes iniciar sesión para acceder a tu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {userLogged.gender === "female" ? (
              <i className="bx bx-female"></i>
            ) : (
              <i className="bx bx-male"></i>
            )}
          </div>
          <div className="profile-info">
            <h1>
              {userLogged.firstName} {userLogged.lastName}
            </h1>
            <p className="profile-email">{userLogged.email}</p>
            <p className="profile-member-since">
              Miembro desde: {userStats?.memberSince || "2023"}
            </p>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            <i className="bx bx-user"></i>
            Información Personal
          </button>
          <button
            className={`tab-button ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <i className="bx bx-calendar"></i>
            Mis Reservas
          </button>
          <button
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <i className="bx bx-star"></i>
            Mis Reseñas
          </button>
          <button
            className={`tab-button ${activeTab === "stats" ? "active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            <i className="bx bx-bar-chart"></i>
            Estadísticas
          </button>
        </div>

        <div className="profile-content">
          {activeTab === "info" && (
            <div className="tab-content">
              <h2>📋 Información Personal</h2>

              <div className="form-section">
                <h3>Datos Personales</h3>
                <form onSubmit={handleSubmit(onSubmitPersonalInfo)}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Nombre</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Tu nombre"
                        {...register("firstName", { required: true })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Apellido</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Tu apellido"
                        {...register("lastName", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="single-column-form">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="tu@email.com"
                        {...register("email", { required: true })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">Género</label>
                      <select id="gender" {...register("gender")}>
                        <option value="">Seleccionar género</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                        <option value="prefer-not-to-say">
                          Prefiero no decir
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn-primary">
                      Actualizar Información
                    </button>
                  </div>
                </form>
              </div>

              <div className="form-section">
                <h3>Cambiar Contraseña</h3>
                <form
                  onSubmit={handleSubmit(onSubmitPasswordChange)}
                  className="password-form"
                >
                  <div className="form-group">
                    <label htmlFor="currentPassword">Contraseña Actual</label>
                    <input
                      type="password"
                      id="currentPassword"
                      placeholder="Contraseña actual"
                      {...register("currentPassword", { required: true })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <input
                      type="password"
                      id="newPassword"
                      placeholder="Nueva contraseña"
                      {...register("newPassword", {
                        required: true,
                        minLength: 6,
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirmar contraseña"
                      {...register("confirmPassword", { required: true })}
                    />
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn-secondary">
                      Cambiar Contraseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="tab-content">
              <h2>Historial de Reservas</h2>
              <div className="bookings-list">
                {bookingHistory.length > 0 ? (
                  bookingHistory.map((booking) => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-info">
                        <h3>{booking.hotelName}</h3>
                        <p>Check-in: {booking.checkIn}</p>
                        <p>Check-out: {booking.checkOut}</p>
                        <p className="booking-total">${booking.total}</p>
                      </div>
                      <div className={`booking-status ${booking.status}`}>
                        {booking.status === "completed" && "Completada"}
                        {booking.status === "confirmed" && "Confirmada"}
                        {booking.status === "cancelled" && "Cancelada"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No tienes reservas aún.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-content">
              <h2>Mis Reseñas</h2>
              <div className="reviews-list">
                {userReviews.length > 0 ? (
                  userReviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <h3>{review.hotelName}</h3>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bx bx-star ${
                                i < review.rating ? "filled" : ""
                              }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <p className="review-date">{review.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No has escrito reseñas aún.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="tab-content">
              <h2>Estadísticas Personales</h2>
              {userStats && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <i className="bx bx-calendar-check"></i>
                    <div className="stat-info">
                      <h3>{userStats.totalBookings}</h3>
                      <p>Reservas Totales</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <i className="bx bx-dollar-circle"></i>
                    <div className="stat-info">
                      <h3>${userStats.totalSpent}</h3>
                      <p>Total Gastado</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <i className="bx bx-map"></i>
                    <div className="stat-info">
                      <h3>{userStats.favoriteCity}</h3>
                      <p>Ciudad Favorita</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <i className="bx bx-time"></i>
                    <div className="stat-info">
                      <h3>{userStats.memberSince}</h3>
                      <p>Miembro Desde</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
