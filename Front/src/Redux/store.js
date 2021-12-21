import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import AuthReducer from './Auth-reducer';
import AdminReducer from './Admin-reducer';
import TeacherReducer from './Teacher-reducer';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  AdminPage: AdminReducer,
  TeacherPage: TeacherReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
