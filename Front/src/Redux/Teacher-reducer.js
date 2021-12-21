const SET_SUBJECTS = 'SET_SUBJECTS';

let initialState = {
  subjects: [],
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

export default TeacherReducer;
