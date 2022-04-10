const SET_USERS = 'SET_USERS';
const DELETE_USER = 'DELETE_USER';
const SET_GROUPS = 'SET_GROUPS';
const ADD_USER = 'ADD_USER';
const ADD_USERS = 'ADD_USERS';
const ADD_LIST_SUBJECTS = ' ADD_LIST_SUBJECTS';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER_ROLE = 'DELETE_USER_ROLE';
const ADD_GROUP = 'ADD_GROUP';
const DELETE_GROUP = ' DELETE_GROUP';

let initialState = {
  users: [],
  usersTotalCount: null,
  isFetchingUsers: true,
  groups: [],
  groupsTotalCount: null,
  isFetchingGroups: true,
  subjects: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
        usersTotalCount: action.payload.totalCount,
        isFetchingUsers: false,
      };

    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload.groups,
        groupsTotalCount: action.payload.totalCount,
        isFetchingGroups: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case ADD_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== action.payload)],
      };

    case DELETE_GROUP:
      return {
        ...state,
        groups: [...state.groups.filter((group) => group.id !== action.payload)],
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
            userRoles: action.payload.roles,
          };
        }
        return item;
      });
      return { ...state, users: newUserData };

    case DELETE_USER_ROLE:
      const deleteUserRole = state.users.map((item) => {
        if (item.id === action.data.id) {
          return {
            ...item,
            userRoles: [...item.userRoles.filter((i) => i.role.id !== action.data.roleId)],
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

export const setUsers = (users, totalCount) => {
  return {
    type: SET_USERS,
    payload: { users, totalCount },
  };
};

export const setGroups = (groups, totalCount) => {
  return {
    type: SET_GROUPS,
    payload: { groups, totalCount },
  };
};

export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: data,
  };
};

export const addGroup = (data) => {
  return {
    type: ADD_GROUP,
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

export const deleteGroup = (id) => {
  return {
    type: DELETE_GROUP,
    payload: id,
  };
};

export const deleteUserRole = (data) => {
  return {
    type: DELETE_USER_ROLE,
    data,
  };
};

export const setListSubjects = (subjects) => {
  return {
    type: ADD_LIST_SUBJECTS,
    payload: subjects,
  };
};

export default AdminReducer;
