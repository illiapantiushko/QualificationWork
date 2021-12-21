const SET_USERS = 'SET_USERS';
const DELETE_USER = 'DELETE_USER';
const SET_GROUPS = 'SET_GROUPS';
const ADD_USER = 'ADD_USER';

let initialState = {
  users: [],
  groups: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        isFetching: false,
      };
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        isFetching: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case DELETE_USER:
      return {
        users: [...state.users.filter((user) => user.id !== action.payload)],
      };

    default:
      return state;
  }
};

export const SetUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const SetGroups = (groups) => {
  return {
    type: SET_GROUPS,
    payload: groups,
  };
};

export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};

export default AdminReducer;
