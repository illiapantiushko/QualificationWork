import { instance, Notification } from './api';
import { SetSubjects, SetSubjectDetails, SetUserInfo } from './../Redux/Profile-reducer';

export const GetInfoCurrentUser = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Users/getCurrentUser');
      dispatch(SetUserInfo(res.data));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const GetSubjects = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get('Teachers/GetAllSubject');
      dispatch(SetSubjects(res.data));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};

export const GetSubjectDetails = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`Users/getTimeTableByUser?subjectId=${id}`);
      dispatch(SetSubjectDetails(res.data));
    } catch (error) {
      Notification(error.response.status, error.message);
    }
  };
};
