import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uploadFile } from "../../services/fileService";
import { AuthContext } from "../../context/AuthContext";
import FileList from "./FileList";
import './SubjectDetailPage.css';

function SubjectDetailPage() {
  const { subjectId } = useParams();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadFile(subjectId, file);
      setMessage("Файл успешно загружен!");
    } catch (error) {
      setMessage("Ошибка загрузки файла.");
      console.error(error);
    }
  };

  return (
    <div className="subject-detail-container">
      <h2>Дисциплина #{subjectId}</h2>

      {/* Отображаем файлы в зависимости от роли пользователя */}
      {user.role === "teacher" ? (
        <div className="file-section">
          <h3>Файлы студентов</h3>
          {/* Если преподаватель, показываем все файлы студентов */}
          <FileList subjectId={subjectId} userRole="teacher" />
        </div>
      ) : (
        <div className="file-section">
          <h3>Файлы преподавателя</h3>
          {/* Если студент, показываем только файлы преподавателя */}
          <FileList subjectId={subjectId} userRole="student" />
        </div>
      )}

      <div className="upload-section">
        <h3>Загрузить ваш файл</h3>
        <form onSubmit={handleUpload}>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="file-input"
          />
          <button type="submit" className="upload-btn">Загрузить</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default SubjectDetailPage;
