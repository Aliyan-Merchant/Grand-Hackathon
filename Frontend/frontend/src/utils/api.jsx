import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-api.com/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Fetch loan categories
export const fetchLoanCategories = async () => {
  const response = await api.get('/loan-categories');
  return response.data;
};

// Example: Register a user
export const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export default api;
