const SET_SUBJECTS = 'SET_SUBJECTS';

let initialState = {
  subjects: [],
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    default:
      return state;
  }
};

export const SetSubjects = (users) => {
  return {
    type: SET_SUBJECTS,
    payload: users,
  };
};

export default ProfileReducer;
