import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/homePage";
import { Route, Routes } from "react-router-dom";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import ApitestExample from "./components/ApiTestExample";
import ReservationPage from "./pages/ReservationPage";
import ProtectedRoutes from "./pages/ProtectedRouter";
import StarRatingDemo from "./demo/StarRatingDemo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hotel/:id" element={<HotelDetailsPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/api-test" element={<ApitestExample />} />
          <Route path="/star-demo" element={<StarRatingDemo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
