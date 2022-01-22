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
    await instance
      .get(
        `Teachers/getAllUsersWithSubjests?pageNumber=${pageNumber}&pageSize=${4}&search=${search}`,
      )
      .then((res) => {
        console.log(res);
        dispatch(
          SetUsers(
            res.data.users.map(
              (row) => ({
                id: row.id,
                key: row.id,
                userName: row.userName,
                email: row.email,
                age: row.age,
                іsContract: row.іsContract,
                profilePicture: row.profilePicture,
                userSubjects: row.userSubjects,
                userRoles: row.userRoles,
              }),
              res.data.TotalCount,
            ),
          ),
        );
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const GetGroups = () => {
  return async (dispatch) => {
    await instance
      .get('Students/getAllGroup')
      .then((res) => {
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
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const AddNewUser = (data) => {
  return async (dispatch) => {
    await instance
      .post(`Users/createUser`, data)
      .then((res) => {
        const newUser = {
          id: 1,
          name: data.userName,
          email: data.userEmail,
          age: data.age,
          userSubjects: [],
          userRoles: [],
        };
        dispatch(addUser(newUser));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const DeleteUser = (id) => {
  return async (dispatch) => {
    await instance
      .delete(`Users/deleteUser?userId=${id}`)
      .then((res) => {
        dispatch(deleteUser(id));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const AddNewUserFromExel = (file) => {
  return async (dispatch) => {
    await instance
      .post(`Users/AddUsersFromExel`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
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
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const GetListSubjects = () => {
  return async (dispatch) => {
    await instance
      .get('Teachers/getSubjects')
      .then((res) => {
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
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const editeUser = (data) => {
  return async (dispatch) => {
    await instance
      .put(`Users/updateUser`, data)
      .then((res) => {
        dispatch(updateUser(data));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const createGroup = (model) => {
  return async (dispatch) => {
    await instance
      .post('Users/createGroup', model)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};
