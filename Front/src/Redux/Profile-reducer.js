const SET_SUBJECTS = 'SET_SUBJECTS';
const SET_SUBJECT_DETAILS = 'SET_SUBJECT_DETAILS';
const SET_USER_INFO = 'SET_USER_INFO';

let initialState = {
  profile: null,
  subjects: [],
  subjectDetails: [],
  isFetching: true,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        isFetching: false,
      };
    case SET_USER_INFO:
      return {
        ...state,
        profile: action.payload,
        isFetching: false,
      };
    case SET_SUBJECT_DETAILS:
      return {
        ...state,
        subjectDetails: action.payload,
      };
    default:
      return state;
  }
};

export const setSubjects = (users) => {
  return {
    type: SET_SUBJECTS,
    payload: users,
  };
};

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  };
};

export const setSubjectDetails = (data) => {
  return {
    type: SET_SUBJECT_DETAILS,
    payload: data,
  };
};

export default ProfileReducer;
