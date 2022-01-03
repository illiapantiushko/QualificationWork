const SET_SUBJECTS = 'SET_SUBJECTS';
const SET_SUBJECT_LESONS = 'SET_SUBJECT_LESONS';
const SET_ATTENDANCE_LIST = 'SET_ATTENDANCE_LIST';
const UPDATE_USER_SCORE = 'UPDATE_USER_SCORE';
const UPDATE_USER_IS_PRESENT = 'UPDATE_USER_IS_PRESENT';

let initialState = {
  subjects: [],
  subjectLesons: [],
  attendanceList: [],
  isFetching: false,
};

const TeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        isFetching: false,
      };

    case SET_SUBJECT_LESONS:
      return {
        ...state,
        subjectLesons: action.payload,
        isFetching: false,
      };
    case SET_ATTENDANCE_LIST:
      return {
        ...state,
        attendanceList: action.payload,
        isFetching: false,
      };
    case UPDATE_USER_SCORE:
      const newScore = state.attendanceList.map((item) => {
        if (item.id === action.row.id) {
          return {
            ...item,
            score: action.row.score,
          };
        }
        return item;
      });
      return { ...state, attendanceList: newScore };
    case UPDATE_USER_IS_PRESENT:
      const newIsPresent = state.attendanceList.map((item) => {
        if (item.id === action.row.id) {
          return {
            ...item,
            isPresent: action.row.isPresent,
          };
        }
        return item;
      });
      return { ...state, attendanceList: newIsPresent };
    default:
      return state;
  }
};

export const SetSubjects = (subjects) => {
  return {
    type: SET_SUBJECTS,
    payload: subjects,
  };
};

export const SetSubjectLesons = (subjectLesons) => {
  return {
    type: SET_SUBJECT_LESONS,
    payload: subjectLesons,
  };
};

export const SetAttendanceList = (attendanceList) => {
  return {
    type: SET_ATTENDANCE_LIST,
    payload: attendanceList,
  };
};

export const UpdateUserScore = (row) => {
  return {
    type: UPDATE_USER_SCORE,
    row,
  };
};

export const UpdateUserIsPresent = (row) => {
  return {
    type: UPDATE_USER_IS_PRESENT,
    row,
  };
};

export default TeacherReducer;
