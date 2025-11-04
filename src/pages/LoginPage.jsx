import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import "./styles/LoginPage.css";

const LoginPage = () => {
  const [userLogged, setUserLogged] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, reset, register } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // Verificar si hay un usuario logueado al cargar el componente
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("userLogged");
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage);
      setUserLogged(parsedUser);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = (data) => {
    loginUser(data);
    reset({
      email: "",
      password: "",
    });
    navigate("/");
  };

  const handleDeleteLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogged");
    // Disparar evento personalizado para actualizar la UI
    window.dispatchEvent(new CustomEvent("authStatusChanged"));
    navigate("/");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section className="login flex-container">
      {userLogged ? (
        <div>
          {userLogged.gender === "female" ? (
            <i className="bx bx-female user__logo"></i>
          ) : (
            <i className="bx bx-male user__logo"></i>
          )}
          <h2>
            {"Welcome, "}{" "}
            <span>
              {userLogged.firstName} {userLogged.lastName}
            </span>
          </h2>
          <button onClick={handleDeleteLocalStorage}>Logout</button>
        </div>
      ) : (
        <div className="login__container">
          <h1 className="login__title">Log in to your account</h1>
          <p className="login__subtitle">
            Welcome back! Please enter your details.
          </p>

          <form className="login__form" onSubmit={handleSubmit(submit)}>
            <div className="login__form-field">
              <input
                className="login__form-input"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div className="login__form-field">
              <div className="login__password-container">
                <input
                  className="login__form-input login__form-input--password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="login__password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}
                  ></i>
                </button>
              </div>
            </div>

            <button type="submit" className="login__form-btn">
              Log In
            </button>
          </form>

          <div className="login__links">
            <a href="#" className="login__link">
              Forgotten password?
            </a>
          </div>

          <div className="login__divider"></div>

          <button
            type="button"
            className="login__register-btn"
            onClick={handleRegisterClick}
          >
            Create new account
          </button>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
