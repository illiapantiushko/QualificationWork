const SET_SUBJECTS = 'SET_SUBJECTS';
const SET_SUBJECT_LESONS = 'SET_SUBJECT_LESONS';
const SET_ATTENDANCE_LIST = 'SET_ATTENDANCE_LIST';
const UPDATE_USER_SCORE = 'UPDATE_USER_SCORE';
const UPDATE_USER_IS_PRESENT = 'UPDATE_USER_IS_PRESENT';
const ADD_NEW_LESSON = 'ADD_NEW_LESSON';
const DELETE_LESSON = 'DELETE_LESSON';

let initialState = {
  subjects: [],
  isFetchingSubjects: true,
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
        isFetchingSubjects: false,
      };

    case SET_SUBJECT_LESONS:
      return {
        ...state,
        subjectLesons: action.payload,
        isFetching: false,
      };
    case ADD_NEW_LESSON:
      return {
        ...state,
        subjectLesons: [...state.subjectLesons, action.payload],
      };
    case DELETE_LESSON:
      return {
        subjectLesons: [
          ...state.subjectLesons.filter((lesson) => lesson.lessonNumber !== action.payload),
        ],
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

export const setSubjects = (subjects) => {
  return {
    type: SET_SUBJECTS,
    payload: subjects,
  };
};

export const setSubjectLesons = (subjectLeson) => {
  return {
    type: SET_SUBJECT_LESONS,
    payload: subjectLeson,
  };
};

export const addNewLesson = (data) => {
  return {
    type: ADD_NEW_LESSON,
    payload: data,
  };
};

export const setAttendanceList = (attendanceList) => {
  return {
    type: SET_ATTENDANCE_LIST,
    payload: attendanceList,
  };
};

export const updateUserScore = (row) => {
  return {
    type: UPDATE_USER_SCORE,
    row,
  };
};

export const updateUserIsPresent = (row) => {
  return {
    type: UPDATE_USER_IS_PRESENT,
    row,
  };
};

export const deleteLesson = (lessonNumber) => {
  return {
    type: DELETE_LESSON,
    payload: lessonNumber,
  };
};

export default TeacherReducer;
