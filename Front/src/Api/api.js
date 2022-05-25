import axios from 'axios';
import { notification } from 'antd';

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
          console.log(error.message);
        });
    }
    throw error;
  },
);

// custom  Notification
export const Notification = (status, message) => {
  if (status !== 401) {
    notification.error({
      message: 'Error ' + status,
      description: message,
    });
  }
  if(status === undefined){
    notification.error({
      message: 'Warning',
      description: message,
    });
  }


};
