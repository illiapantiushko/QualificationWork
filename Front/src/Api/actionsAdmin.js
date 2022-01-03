import { instance } from './api';
import { notification } from 'antd';
import { SetUsers, SetGroups, addUser, addUsers, deleteUser } from './../Redux/Admin-reducer';

const Notification = (status, message) => {
  notification.error({
    message: status,
    description: message,
  });
};

export const GetUsers = () => {
  return async (dispatch) => {
    await instance
      .get('Teachers/getAllSubjectByUser')
      .then((res) => {
        dispatch(
          SetUsers(
            res.data.map((row) => ({
              id: row.id,
              key: row.id,
              name: row.userName,
              email: row.email,
              age: row.age,
              userSubjects: row.userSubjects,
              userRoles: row.userRoles,
            })),
          ),
        );
      })
      .catch((err) => Notification(err.status, err.message));
  };
};

export const GetGroups = () => {
  return async (dispatch) => {
    await instance
      .get('Students/getAllUserByGroup')
      .then((res) => {
        dispatch(
          SetGroups(
            res.data.map((row) => ({
              id: row.id,
              key: row.id,
              name: row.groupName,
              userGroups: row.userGroups,
            })),
          ),
        );
      })
      .catch((err) => Notification(err.status, err.message));
  };
};

export const AddNewUser = (data) => {
  return async (dispatch) => {
    const res = await instance
      .post(`Users/createUser`, data)
      .then((res) => {
        const newItem = {
          id: 1,
          name: data.userName,
          email: data.userEmail,
          age: data.age,
          userSubjects: [],
          userRoles: [],
        };
        dispatch(addUser(newItem));
      })
      .catch((err) => Notification(err.status, err.message));
  };
};

export const DeleteUser = (id) => {
  return async (dispatch) => {
    const res = await instance
      .delete(`Users/deleteUser?userId=${id}`)
      .then((res) => {
        dispatch(deleteUser(id));
      })
      .catch((err) => Notification(err.status, err.message));
  };
};

export const AddNewUserFromExel = (file) => {
  return async (dispatch) => {
    const res = await instance
      .post(`Users/AddUsersFromExel`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // const newItem3 = {
        //   id: 1,
        //   name: res.data[2].userName,
        //   email: res.data[2].userEmail,
        //   age: res.data[2].age,
        //   userSubjects: [],
        //   userRoles: [],
        // };
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
      })
      .catch((err) => Notification(err.status, err.message));
  };
};
