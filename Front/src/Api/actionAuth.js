import { instance, Notification } from './api';
import { setAuthUserData } from './../Redux/Auth-reducer';
import { redirectByRole } from './../Utils/Redirect';
import { useNavigate } from 'react-router-dom';
const setDataLocalStorage = (jwtToken, refreshToken, userName, roles) => {
  localStorage.setItem('token', jwtToken);

  localStorage.setItem('refreshToken', refreshToken);

  localStorage.setItem('name', userName);

  localStorage.setItem('roles', JSON.stringify(roles));
};

export const setUserData = (googleToken,redirect) => {
  return async (dispatch) => {
    try {
      const res = await instance.post('Authentication/authenticate', { googleToken });
      const redirectTo = redirectByRole(res.data.roles[0]);
      dispatch(setAuthUserData(res.data.userName, res.data.roles, true,redirectTo ));
      setDataLocalStorage(
        res.data.jwtToken,
        res.data.refreshToken,
        res.data.userName,
        res.data.roles,
      );
    
      redirect(redirectTo);
    
    } catch (error) {
   
    }
  };
};
