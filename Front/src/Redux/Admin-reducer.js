const SET_USERS = 'SET_USERS';
const DELETE_USER = 'DELETE_USER';
const SET_GROUPS = 'SET_GROUPS';
const ADD_USER = 'ADD_USER';
const ADD_USERS = 'ADD_USERS';
const ADD_LIST_SUBJECTS = ' ADD_LIST_SUBJECTS';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER_ROLE = 'DELETE_USER_ROLE';

let initialState = {
  users: [],
  usersTotalCount: null,
  groups: [],
  subjects: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
        usersTotalCount: action.totalCount,
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
    case ADD_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case DELETE_USER:
      return {
        users: [...state.users.filter((user) => user.id !== action.payload)],
      };

    case UPDATE_USER:
      const newUserData = state.users.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            userName: action.payload.userName,
            userEmail: action.payload.userEmail,
            age: action.payload.age,
            isContract: action.payload.isContract,
          };
        }
        return item;
      });
      return { ...state, users: newUserData };

    case DELETE_USER_ROLE:
      const deleteUserRole = state.users.map((item) => {
        if (item.id === action.row.id) {
          return {
            ...item,
            userRoles: [...item.userRoles.filter((role) => role.id !== action.row.roleId)],
          };
        }
        return item;
      });
      return { ...state, users: deleteUserRole };
    case ADD_LIST_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };

    default:
      return state;
  }
};

export const SetUsers = (users, totalCount) => {
  return {
    type: SET_USERS,
    payload: { users, totalCount },
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

export const updateUser = (userData) => {
  return {
    type: UPDATE_USER,
    payload: userData,
  };
};

export const addUsers = (users) => {
  return {
    type: ADD_USERS,
    payload: users,
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};

export const deleteUserRole = (row) => {
  return {
    type: DELETE_USER_ROLE,
    row,
  };
};

export const setlistSubjects = (subjects) => {
  return {
    type: ADD_LIST_SUBJECTS,
    payload: subjects,
  };
};

export default AdminReducer;
