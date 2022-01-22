import { instance, Notification } from './api';
import { SetSubjects, SetSubjectDetails, SetUserInfo } from './../Redux/Profile-reducer';

export const GetInfoCurrentUser = () => {
  return async (dispatch) => {
    await instance
      .get('Users/getCurrentUser')
      .then((res) => {
        dispatch(SetUserInfo(res.data));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const GetSubjects = () => {
  return async (dispatch) => {
    await instance
      .get('Teachers/GetAllSubject')
      .then((res) => {
        dispatch(SetSubjects(res.data));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};

export const GetSubjectDetails = (id) => {
  return async (dispatch) => {
    await instance
      .get(`Users/getTimeTableByUser?subjectId=${id}`)
      .then((res) => {
        dispatch(SetSubjectDetails(res.data));
      })
      .catch((err) => Notification(err.response.status, err.message));
  };
};
