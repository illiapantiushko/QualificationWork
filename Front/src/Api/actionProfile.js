import { instance } from './api';
import { notification } from 'antd';
import { SetSubjects } from './../Redux/Profile-reducer';

const Notification = (status, message) => {
  notification.error({
    message: status,
    description: message,
  });
};

export const GetSubjects = () => {
  return async (dispatch) => {
    await instance
      .get('Teachers/GetAllSubject')
      .then((res) => {
        dispatch(SetSubjects(res.data));
      })
      .catch((err) => Notification(err.status, err.message));
  };
};
