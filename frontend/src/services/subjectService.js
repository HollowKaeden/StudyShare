import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const fetchSubjects = async () => {
  try {
    const token = localStorage.getItem("accessToken"); 
    const response = await axios.get(`${API_URL}/api/user_subjects/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};

