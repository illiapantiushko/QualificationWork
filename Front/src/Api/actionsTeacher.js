import { instance, Notification } from './api';
import {
  setSubjects,
  setSubjectLesons,
  setAttendanceList,
  updateUserScore,
  updateUserIsPresent,
  addNewLesson,
  deleteLesson,
} from './../Redux/Teacher-reducer';

export const getSubjects = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Users/getAllTeacherSubject');

      dispatch(
        setSubjects(
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
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getSubjectLesons = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Users/GetSubjectTopic?subjectId=${id}`);

      dispatch(
        setSubjectLesons(
          res.data.map((row) => ({
            id: row.id,
            key: row.id,
            lessonNumber: row.lessonNumber,
            lessonDate: row.lessonDate,
          })),
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getAttendanceList = (id, namberleson) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(
        `Users/getUsersTimeTable?subjectId=${id}&namberleson=${namberleson}`,
      );

      dispatch(
        setAttendanceList(
          res.data.map((row) => ({
            id: row.id,
            key: row.id,
            userName: row.userName,
            timeTableId: row.userSubjects[0].timeTable[0].id,
            isPresent: row.userSubjects[0].timeTable[0].isPresent,
            score: row.userSubjects[0].timeTable[0].score,
          })),
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const setNewUserScore = (row) => {
  return async (dispatch) => {
    try {
      const res = await instance.put(`Users/updateUserScore`, { id: row.id, score: row.score });

      dispatch(updateUserScore(row));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const setNewUserIsPresent = (id, isPresent) => {
  return async (dispatch) => {
    try {
      const res = await instance.put(`Users/updateUserIsPresent`, { id, isPresent });

      dispatch(updateUserIsPresent({ id, isPresent }));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const addLesson = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.post(`Teachers/addLesson`, data);

      const newLeson = {
        id: 1,
        key: 1,
        lessonNumber: data.lessonNumber,
        lessonDate: data.date,
      };
      dispatch(addNewLesson(newLeson));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const removeLesson = (lessonNumber, subjectId) => {
  return async (dispatch) => {
    try {
      const res = await instance.delete(
        `Teachers/deleteLesson?lessonNumber=${lessonNumber}&subjectId=${subjectId}`,
      );
      dispatch(deleteLesson(lessonNumber));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getSubjectReport = (subjectId) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Users/exportToExcelUserTimeTable?subjectId=${subjectId}`, {
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
