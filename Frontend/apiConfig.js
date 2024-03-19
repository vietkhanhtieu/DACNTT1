// Trong file api.js
const API_BASE_URL = 'http://42.96.5.250:5197/api';
const API_KEY = '6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN';

export const fetchAPI = async (endpoint, options = {}) => {
  const config = {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Apikey': API_KEY,
    },
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
  if (response.headers.get('content-length') === '0' || !response.headers.get('content-type') || !response.headers.get('content-type').includes('application/json')) {
    return {}; 
  }  
  return response.json();
};