import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://localhost:44384/api/',
});

instance.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      await instance
        .post(`Authentication/refresh-token`, { refreshToken })
        .then(function (response) {
          localStorage.setItem('token', response.data.jwtToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);

          return instance.request(originalRequest);
        })
        .catch(function (error) {
          alert(error.message);
          console.log(error.message);
        });
    }
    throw error;
  },
);
