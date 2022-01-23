import { instance, Notification } from './api';
import { SetAuthUserData } from './../Redux/Auth-reducer';

const setDataLocalStorage = (jwtToken, refreshToken, userName, roles) => {
  localStorage.setItem('token', jwtToken);

  localStorage.setItem('refreshToken', refreshToken);

  localStorage.setItem('name', userName);

  localStorage.setItem('roles', JSON.stringify(roles));
};

export const setUserData = (googleToken) => {
  return async (dispatch) => {
    try {
      const res = await instance.post('Authentication/authenticate', { googleToken });

      setDataLocalStorage(
        res.data.jwtToken,
        res.data.refreshToken,
        res.data.userName,
        res.data.roles,
      );
      dispatch(SetAuthUserData(res.data.userName, res.data.roles, true));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};
