const SET_SUBJECTS = 'SET_SUBJECTS';
const SET_SUBJECT_DETAILS = 'SET_SUBJECT_DETAILS';
const SET_USER_INFO = 'SET_USER_INFO';
const SET_SUBJECTS_FETCHING = 'SET_SUBJECTS_FETCHING';

let initialState = {
  profile: null,
  subjects: [],
  isFetchingSubjects: true,
  subjectDetails: [],
  isFetching: true,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        isFetchingSubjects: false,
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
    case SET_SUBJECTS_FETCHING:
      return {
        ...state,
        isFetchingSubjects: true,
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

export const setSubjectFetching = () => {
  return {
    type: SET_SUBJECTS_FETCHING,
  };
};

export default ProfileReducer;
