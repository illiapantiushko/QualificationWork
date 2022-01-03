import { instance } from './api';
import { notification } from 'antd';
import {
  SetSubjects,
  SetSubjectLesons,
  SetAttendanceList,
  UpdateUserScore,
  UpdateUserIsPresent,
} from './../Redux/Teacher-reducer';

const Notification = (status, message) => {
  notification.error({
    message: status,
    description: message,
  });
};

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
      .catch((err) => Notification(err.status, err.message));
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
      .catch((err) => Notification(err.status, err.message));
  };
};

export const GetAttendanceList = (id, namberleson) => {
  return async (dispatch) => {
    await instance
      .get(`Users/getUsersTimeTable?subjectId=${id}&namberleson=${namberleson}`)
      .then((res) => {
        dispatch(
          SetAttendanceList(
            res.data.map((row) => ({
              id: row.id,
              key: row.id,
              userName: row.userName,
              timeTableId: row.userSubjects[0].timeTable.id,
              isPresent: row.userSubjects[0].timeTable.isPresent,
              score: row.userSubjects[0].timeTable.score,
            })),
          ),
        );
      })
      .catch((err) => Notification(err.status, err.message));
  };
};

export const SetNewUserScore = (row) => {
  return async (dispatch) => {
    await instance
      .put(`Users/updateUserScore`, { id: row.id, score: row.score })
      .then((res) => {
        dispatch(UpdateUserScore(row));
      })
      .catch((err) => Notification(err.status, err.message));
  };
};

export const SetNewUserIsPresent = (id, isPresent) => {
  return async (dispatch) => {
    await instance
      .put(`Users/updateUserIsPresent`, { id, isPresent })
      .then((res) => {
        dispatch(UpdateUserIsPresent({ id, isPresent }));
      })
      .catch((err) => Notification(err.status, err.message));
  };
};
