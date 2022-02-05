import { instance, Notification } from './api';
import { setSubjects, setSubjectDetails, setUserInfo } from './../Redux/Profile-reducer';

export const getInfoCurrentUser = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Users/getCurrentUser');
      dispatch(setUserInfo(res.data));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getSubjects = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Teachers/GetAllSubject');
      dispatch(setSubjects(res.data));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getSubjectDetails = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Users/getTimeTableByUser?subjectId=${id}`);
      dispatch(setSubjectDetails(res.data));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getUserReport = (userId) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Users/exportToExcelByUser`, {
        responseType: 'arraybuffer',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Звіт.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};
