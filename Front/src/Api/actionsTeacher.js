import { instance, Notification } from './api';
import { notification } from 'antd';
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
            timeTables: row.timeTables,
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
        setSubjectLesons(res.data),
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
            timeTableId: row.timeTables[0].id,
            isPresent: row.timeTables[0].isPresent,
            score: row.timeTables[0].score,
          })),
        ),
      );
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const setNewUserScore = (row, lessonNumber) => {
  return async (dispatch) => {
    try {
      const res = await instance.put(`Users/updateUserScore`, {
        id: row.id,
        score: row.score,
        lessonNumber,
      });

      dispatch(updateUserScore(row));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const setNewUserIsPresent = (id, isPresent, lessonNumber) => {
  return async (dispatch) => {
    try {
      const res = await instance.put(`Users/updateUserIsPresent`, { id, isPresent, lessonNumber });

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
      if (res.status === 200) {
        notification.success({
          message: '200',
          description: 'Заннятя успішно додано',
        });
      }
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
      if (res.status === 200) {
        notification.success({
          message: '200',
          description: 'Заннятя успішно видалено',
        });
      }
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const getSubjectReport = (subjectId) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Exels/exportToExcelBySubject?subjectId=${subjectId}`, {
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
