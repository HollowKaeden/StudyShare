import { useEffect, useState } from "react";
import { fetchStudentFiles, fetchTeacherFiles } from "../../services/fileService";
import './FileList.css';

function FileList({ subjectId, userRole }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        let data;
        if (userRole === "student") {
          // Для студента загружаем только файлы преподавателя
          data = await fetchTeacherFiles(subjectId);
        } else if (userRole === "teacher") {
          // Для преподавателя загружаем все файлы (студентов)
          data = await fetchStudentFiles(subjectId);
        }
        setFiles(data);
      } catch (error) {
        setError("Ошибка загрузки файлов");
        console.error("Ошибка при загрузке файлов", error);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [subjectId, userRole]);

  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="file-list-container">
      <ul>
        {files.length === 0 ? (
          <p className="no-files">Нет доступных файлов.</p>
        ) : (
          files.map((file) => (
            <li key={file.id} className="file-item">
              <a href={file.path} target="_blank" rel="noopener noreferrer" className="file-link">
                {file.name}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FileList;
