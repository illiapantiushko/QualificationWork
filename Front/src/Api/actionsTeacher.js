import { instance, Notification } from './api';
import { saveAs } from 'file-saver';

import {
  SetSubjects,
  SetSubjectLesons,
  SetAttendanceList,
  UpdateUserScore,
  UpdateUserIsPresent,
  addNewLesson,
  deleteLesson,
} from './../Redux/Teacher-reducer';

export const GetSubjects = () => {
  return async (dispatch) => {
    await instance
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
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const GetSubjectLesons = (id) => {
  return async (dispatch) => {
    await instance
      .get(`Users/GetSubjectTopic?subjectId=${id}`)
      .then((res) => {
        dispatch(
          SetSubjectLesons(
            res.data.map((row) => ({
              id: row.id,
              key: row.id,
              lessonNumber: row.lessonNumber,
              lessonDate: row.lessonDate,
            })),
          ),
        );
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const GetAttendanceList = (id, namberleson) => {
  return async (dispatch) => {
    await instance
      .get(`Users/getUsersTimeTable?subjectId=${id}&namberleson=${namberleson}`)
      .then((res) => {
        console.log(res.data);
        dispatch(
          SetAttendanceList(
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
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const SetNewUserScore = (row) => {
  return async (dispatch) => {
    await instance
      .put(`Users/updateUserScore`, { id: row.id, score: row.score })
      .then((res) => {
        dispatch(UpdateUserScore(row));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const SetNewUserIsPresent = (id, isPresent) => {
  return async (dispatch) => {
    await instance
      .put(`Users/updateUserIsPresent`, { id, isPresent })
      .then((res) => {
        dispatch(UpdateUserIsPresent({ id, isPresent }));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const AddLesson = (data) => {
  return async (dispatch) => {
    await instance
      .post(`Teachers/addLesson`, data)
      .then((res) => {
        const newLeson = {
          id: 1,
          key: 1,
          lessonNumber: data.lessonNumber,
          lessonDate: data.date,
        };
        dispatch(addNewLesson(newLeson));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const removeLesson = (lessonNumber, subjectId) => {
  return async (dispatch) => {
    await instance
      .delete(`Teachers/deleteLesson?lessonNumber=${lessonNumber}&subjectId=${subjectId}`)
      .then((res) => {
        dispatch(deleteLesson(lessonNumber));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const getSubjectReport = (subjectId) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Users/exportToExcelUserTimeTable?subjectId=${subjectId}`, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};
