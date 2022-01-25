const SET_USER_DATA = 'SET_USER_DATA';
const LOGOUT = 'LOGOUT';

let initialState = {
  name: !localStorage.getItem('name') ? false : localStorage.getItem('name'),
  roles: !localStorage.getItem('roles') ? [] : JSON.parse(localStorage.getItem('roles')),
  isAuth: !localStorage.getItem('token') ? false : true,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (name, role, isAuth) => {
  return {
    type: SET_USER_DATA,
    payload: { name, role, isAuth },
  };
};

export const logout = (name, role, isAuth) => {
  return {
    type: LOGOUT,
    payload: { name, role, isAuth },
  };
};

export default AuthReducer;
