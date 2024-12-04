import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SubjectsPage from "./SubjectPage";
import "./HomePage.css";

function HomePage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="home-container">
        <h1 className="welcome-title">Добро пожаловать!</h1>
        <p className="welcome-message">
          <Link to="/register" className="auth-link">
            Зарегистрируйтесь
          </Link>{" "}
          или{" "}
          <Link to="/login" className="auth-link">
            войдите
          </Link>{" "}
          чтобы получить доступ.
        </p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="welcome-title">Добро пожаловать, {user.username}!</h1>
      <SubjectsPage />
    </div>
  );
}

export default HomePage;
