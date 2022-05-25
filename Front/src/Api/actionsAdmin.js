import { instance, Notification } from './api';
import { notification } from 'antd';
import {
  setUsers,
  setGroups,
  addUser,
  addUsers,
  deleteUser,
  setListSubjects,
  updateUser,
  deleteUserRole,
  addGroup,
  deleteGroup,
} from './../Redux/Admin-reducer';

export const getUsers = (pageNumber = 1, search = '') => {
  return async (dispatch) => {
    try {
      const res = await instance.get(
        `Users/getAllUsersWithSubjests?pageNumber=${pageNumber}&pageSize=${4}&search=${search}`,
      );
      dispatch(
        setUsers(
          res.data.data.map((row) => ({
            id: row.id,
            key: row.id,
            userName: row.userName,
            email: row.email,
            age: row.age,
            іsContract: row.іsContract,
            profilePicture: row.profilePicture,
            timeTables: row.timeTables,
            userRoles: row.userRoles?.map((r) => r.role.name),
          })),
          res.data.totalCount,
        ),
      );
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const getGroups = (pageNumber = 1, search = '') => {
  return async (dispatch) => {
    try {
      const res = await instance.get(
        `Users/getAllGroups?pageNumber=${pageNumber}&pageSize=${5}&search=${search}`,
      );
      dispatch(
        setGroups(
          res.data.data.map((row) => ({
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
      Notification(error.response?.status, error.message);
    }
  };
};

export const addNewUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.post(`Users/createUser`, data);
      const newUser = {
        id: 1,
        userName: data.userName,
        email: data.userEmail,
        age: data.age,
        timeTables: [],
        userRoles: data.roles,
      };
      dispatch(addUser(newUser));
      if (res.status === 200) {
        notification.success({
          description: 'Користувача успішно додано',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const deleteUserData = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.delete(`Users/deleteUser?userId=${id}`);
      dispatch(deleteUser(id));
      if (res.status === 200) {
        notification.success({
          description: 'Користувача видалено',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const deleteGroupData = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.delete(`Users/deleteGroup?groupId=${id}`);
      dispatch(deleteGroup(id));
      if (res.status === 200) {
        notification.success({
          description: 'Групу видалено видалено',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
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

      if (res.status === 200) {
        notification.success({
          description: 'Користувачів успішно додано',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const getListSubjects = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Users/getSubjects');

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
      Notification(error.response?.status, error.message);
    }
  };
};
export const editeUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.put(`Users/updateUser`, data);
      dispatch(updateUser(data));
      if (res.status === 200) {
        notification.success({
          description: 'Користувача редаговано',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
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
      if (res.status === 200) {
        notification.success({
          description: 'Роль користувача успішно видалено',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const getUserList = (pageNumber = 1) => {
  return async () => {
    try {
      return await instance.get(
        `Users/getAllUsersWithSubjests?pageNumber=${pageNumber}&pageSize=${4}&search=${''}`,
      );
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const createNewGroup = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.post(`Users/createGroup`, data);

      const randomValue = Math.random();
      const newGroup = {
        id: randomValue,
        key: randomValue + 1,
        name: data.groupName,
        userGroups: [],
        faculty: data.facultyName,
      };
      dispatch(addGroup(newGroup));
      if (res.status === 200) {
        notification.success({
          description: 'Групу успішно додано',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const addUserGroup = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.post(`Users/addUserGroup`, data);

      if (res.status === 200) {
        notification.success({
          description: 'Користувачів успішно додано до групи',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const addUserSubject = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.post(`Users/addUserSubject`, data);

      if (res.status === 200) {
        notification.success({
          description: 'Предмети успішно додано до групи',
        });
      }
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};
