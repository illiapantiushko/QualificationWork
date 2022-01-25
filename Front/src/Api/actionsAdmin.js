import { instance, Notification } from './api';
import {
  setUsers,
  setGroups,
  addUser,
  addUsers,
  deleteUser,
  setListSubjects,
  updateUser,
  deleteUserRole,
} from './../Redux/Admin-reducer';

export const getUsers = (pageNumber = 1, search = '') => {
  return async (dispatch) => {
    try {
      const res = await instance.get(
        `Teachers/getAllUsersWithSubjests?pageNumber=${pageNumber}&pageSize=${4}&search=${search}`,
      );
      dispatch(
        setUsers(
          res.data.users.map((row) => ({
            id: row.id,
            key: row.id,
            userName: row.userName,
            email: row.email,
            age: row.age,
            іsContract: row.іsContract,
            profilePicture: row.profilePicture,
            userSubjects: row.userSubjects,
            userRoles: row.userRoles,
          })),
          res.data.totalCount,
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getGroups = (pageNumber = 1, search = '') => {
  return async (dispatch) => {
    try {
      const res = await instance.get(
        `Students/getAllGroups?pageNumber=${pageNumber}&pageSize=${5}&search=${search}`,
      );
      dispatch(
        setGroups(
          res.data.groups.map((row) => ({
            id: row.id,
            key: row.id,
            name: row.groupName,
            userGroups: row.userGroups,
            faculty: row.faculty.facultyName,
          })),
          res.data.totalCount,
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const addNewUser = (data) => {
  return async (dispatch) => {
    try {
      await instance.post(`Users/createUser`, data);
      const newUser = {
        id: 1,
        name: data.userName,
        email: data.userEmail,
        age: data.age,
        userSubjects: [],
        userRoles: [],
      };
      dispatch(addUser(newUser));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const deleteUserData = (id) => {
  return async (dispatch) => {
    try {
      await instance.delete(`Users/deleteUser?userId=${id}`);
      dispatch(deleteUser(id));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const addNewUserFromExel = (file) => {
  return async (dispatch) => {
    try {
      const res = await instance.post(`Users/AddUsersFromExel`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(
        addUsers(
          res.data.map((row, index) => ({
            id: index,
            key: index,
            name: row.userName,
            email: row.userEmail,
            age: row.age,
            userSubjects: [],
            userRoles: [],
          })),
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getListSubjects = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Teachers/getSubjects');

      dispatch(
        setListSubjects(
          res.data.map((row) => ({
            id: row.id,
            key: row.id,
            subjectName: row.subjectName,
            isActive: row.isActive,
            amountCredits: row.amountCredits,
            subjectСlosingDate: row.subjectСlosingDate,
          })),
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};
export const editeUser = (data) => {
  return async (dispatch) => {
    try {
      await instance.put(`Users/updateUser`, data);
      dispatch(updateUser(data));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const createGroup = (model) => {
  return async (dispatch) => {
    try {
      const res = await instance.post('Users/createGroup', model);
      dispatch(getUsers(1, ''));
      dispatch(getGroups());
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const deleteRole = (data) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId: data.id,
        roleName: data.role.name,
      };
      const res = await instance.post('Users/deleteRole', requestData);
      dispatch(deleteUserRole({ id: data.id, roleId: data.role.id }));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};
