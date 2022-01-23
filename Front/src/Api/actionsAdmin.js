import { instance, Notification } from './api';
import {
  SetUsers,
  SetGroups,
  addUser,
  addUsers,
  deleteUser,
  setlistSubjects,
  updateUser,
} from './../Redux/Admin-reducer';

export const GetUsers = (pageNumber = 1, search = '') => {
  return async (dispatch) => {
    try {
      const res = await instance.get(
        `Teachers/getAllUsersWithSubjests?pageNumber=${pageNumber}&pageSize=${2}&search=${search}`,
      );
      dispatch(
        SetUsers(
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

export const GetGroups = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Students/getAllGroup');

      dispatch(
        SetGroups(
          res.data.map((row) => ({
            id: row.id,
            key: row.id,
            name: row.groupName,
            userGroups: row.userGroups,
            faculty: row.faculty.facultyName,
          })),
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const AddNewUser = (data) => {
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

export const DeleteUser = (id) => {
  return async (dispatch) => {
    try {
      await instance.delete(`Users/deleteUser?userId=${id}`);
      dispatch(deleteUser(id));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const AddNewUserFromExel = (file) => {
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

export const GetListSubjects = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Teachers/getSubjects');

      dispatch(
        setlistSubjects(
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
      dispatch(GetUsers(1, ''));
      dispatch(GetGroups());
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};
