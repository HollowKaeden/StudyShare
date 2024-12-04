import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const fetchStudentFiles = async (subjectId) => {
  try {
    let url = `${API_URL}/files/subject/students/${subjectId}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении файлов", error);
    throw error;
  }
};


export const fetchTeacherFiles = async (subjectId) => {
    try {
        let url = `${API_URL}/files/subject/teachers/${subjectId}`;
    
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error("Ошибка при получении файлов", error);
        throw error;
      }
  };


export const uploadFile = async (subjectId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${API_URL}/files/upload_subject/${subjectId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
