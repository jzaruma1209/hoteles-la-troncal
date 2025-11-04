import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "boxicons/css/boxicons.min.css";
import "./styles/RegisterPage.css";

const RegisterPage = () => {
  const { createUser } = useAuth();
  const [selectedGender, setSelectedGender] = useState("male");
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setSelectedGender(value);
    setShowCustomOptions(value === "custom");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = (data) => {
    // Solo enviamos los datos básicos a la API
    const apiData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      gender: selectedGender === "custom" ? "other" : selectedGender,
    };

    createUser(apiData);
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setSelectedGender("male");
    setShowCustomOptions(false);
  };

  return (
    <section className="register flex-container">
      <div className="register__container">
        <h1 className="register__title">Create a new account</h1>
        <p className="register__subtitle">It's quick and easy.</p>

        <form className="register__form" onSubmit={handleSubmit(submit)}>
          <div className="register__name-fields">
            <div className="register__form-field register__form-field--half">
              <input
                className="register__form-input"
                type="text"
                placeholder="First name"
                autoComplete="given-name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </div>

            <div className="register__form-field register__form-field--half">
              <input
                className="register__form-input"
                type="text"
                placeholder="Last name"
                autoComplete="family-name"
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>
          </div>

          <div className="register__form-field">
            <input
              className="register__form-input"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
            />
          </div>

          <div className="register__form-field">
            <div className="register__password-container">
              <input
                className="register__form-input register__form-input--password"
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                autoComplete="new-password"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                className="register__password-toggle"
                onClick={togglePasswordVisibility}
              >
                <i className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}></i>
              </button>
            </div>
          </div>

          <div className="register__form-field">
            <label className="register__form-label">Gender</label>
            <select
              className="register__form-select"
              value={selectedGender}
              onChange={handleGenderChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {showCustomOptions && (
            <div className="register__custom-options">
              <div className="register__form-field">
                <select className="register__form-select register__pronoun-select">
                  <option value="">Select your pronoun</option>
                  <option value="she">She: "Wish her a happy birthday!"</option>
                  <option value="he">He: "Wish him a happy birthday!"</option>
                  <option value="they">
                    They: "Wish them a happy birthday!"
                  </option>
                </select>
              </div>

              <div className="register__form-field">
                <input
                  className="register__form-input"
                  type="text"
                  placeholder="Gender (optional)"
                />
              </div>
            </div>
          )}

          <button type="submit" className="register__form-btn">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
