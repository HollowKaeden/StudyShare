import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from "./components/mainPages/HomePage";
import SubjectDetailPage from "./components/mainPages/SubjectDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subjects/:subjectId" element={<SubjectDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
