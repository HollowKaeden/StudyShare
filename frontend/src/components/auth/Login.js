import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenData = await loginUser(credentials);
      localStorage.setItem("accessToken", tokenData.access);
      localStorage.setItem("refreshToken", tokenData.refresh);

      const userData = await getCurrentUser();
      localStorage.setItem("username", userData.username);
      localStorage.setItem("role", userData.role);

      login({ username: userData.username, role: userData.role });

      setMessage("Вход выполнен успешно!");
      navigate("/");
    } catch (error) {
      setMessage("Ошибка авторизации!");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
