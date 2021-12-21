import { instance } from './api';
import { SetAuthUserData } from './../Redux/Auth-reducer';
import { notification } from 'antd';
import { SetUsers, SetGroups, addUser, deleteUser } from './../Redux/Admin-reducer';
import { SetSubjects } from './../Redux/Teacher-reducer';

const setDataLocalStorage = (jwtToken, refreshToken, userName, roles) => {
  localStorage.setItem('token', jwtToken);

  localStorage.setItem('refreshToken', refreshToken);

  localStorage.setItem('name', userName);

  localStorage.setItem('roles', JSON.stringify(roles));
};

export const setUserData = (googleToken) => {
  return async (dispatch) => {
    const res = await instance
      .post('Authentication/authenticate', { googleToken })
      .then((res) => {
        // console.log(res);
        setDataLocalStorage(
          res.data.jwtToken,
          res.data.refreshToken,
          res.data.userName,
          res.data.roles,
        );

        dispatch(SetAuthUserData(res.data.userName, res.data.roles, true));
      })
      .catch((err) => {});
  };
};

export const GetUsers = () => {
  return async (dispatch) => {
    const res = await instance
      .get('Subjects/getAllSubjectByUser')
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
      .catch((err) => {});
  };
};

export const GetGroups = () => {
  return async (dispatch) => {
    const res = await instance
      .get('Groups/getAllUserByGroup')
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
      .catch((err) => {});
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
      .catch((err) => {});
  };
};

export const DeleteUser = (id) => {
  return async (dispatch) => {
    const res = await instance
      .delete(`Users/deleteUser?userId=${id}`)
      .then((res) => {
        dispatch(deleteUser(id));
      })
      .catch((err) => {});
  };
};

export const GetSubjects = () => {
  return async (dispatch) => {
    const res = await instance
      .get('Users/getAllTeacherSubject')
      .then((res) => {
        dispatch(
          SetSubjects(
            res.data.map((row) => ({
              id: row.id,
              key: row.id,
              subjectName: row.subjectName,
              isActive: row.isActive,
              amountCredits: row.amountCredits,
              subjectСlosingDate: row.subjectСlosingDate,
              userSubjects: row.userSubjects,
            })),
          ),
        );
      })
      .catch((err) => {});
  };
};
