import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;