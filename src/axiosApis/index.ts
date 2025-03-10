import axios from 'axios';

export const basePath = window?.location?.origin;

// Read API URL from .env file
export const api_layer_url = process.env.REACT_APP_API_URL || 'http://localhost:5600';

const axiosClient = axios.create({
    baseURL: api_layer_url,
});
axiosClient.interceptors.request.use(function (config:any) {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log('orig', originalRequest);
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);
export default axiosClient;
