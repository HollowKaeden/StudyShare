import { useState } from "react";
import axios from "axios";

function UploadFile({ subjectId }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Выберите файл перед загрузкой.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(`files/upload_subject/${subjectId}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Файл успешно загружен.");
    } catch (error) {
      setMessage("Ошибка при загрузке файла.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h3>Загрузить файл</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Загрузить</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadFile;
