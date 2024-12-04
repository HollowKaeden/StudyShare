import axios from "axios";

const API_URL = "http://127.0.0.1:8000";


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/register/`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/token/`, credentials);
    return response.data; // Токены (access, refresh)
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_URL}/api/current_user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Данные о пользователе
  } catch (error) {
    throw error;
  }
};
