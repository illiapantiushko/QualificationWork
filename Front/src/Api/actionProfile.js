import { instance, Notification } from './api';
import { setSubjects, setSubjectDetails, setUserInfo } from './../Redux/Profile-reducer';

import { setSubjectFetching } from './../Redux/Profile-reducer';

export const getInfoCurrentUser = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Authentication/getCurrentUser');
      dispatch(setUserInfo(res.data));
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const getSubjects = () => {
  return async (dispatch) => {
    try {
      dispatch(setSubjectFetching());
      const res = await instance.get('Students/GetAllSubject');
      dispatch(
        setSubjects(
          res.data.map((row) => ({
            id: row.id,
            key: row.id,
            subjectName: row.subjectName,
            isActive: row.isActive,
            amountCredits: row.amountCredits,
            subjectСlosingDate: row.subjectСlosingDate,
            teacher:[row.teacherSubjects[0].user.userName, row.teacherSubjects[0].user.email],
            timeTables: row.timeTables,
          })),

          res.data,
        ),
      );
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const getSubjectDetails = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Students/getTimeTableByUser?subjectId=${id}`);
      dispatch(setSubjectDetails(res.data));
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};

export const getUserReport = (userId) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Exels/exportToExcelByUser`, {
        responseType: 'arraybuffer',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Звіт.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      Notification(error.response?.status, error.message);
    }
  };
};
