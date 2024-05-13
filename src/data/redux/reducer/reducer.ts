import { combineReducers } from '@reduxjs/toolkit';
import {
  authReducer,
  uiReducer,
  userReducer
} from './slices';

const reducers = combineReducers({
  authReducer,
  uiReducer,
  userReducer
});

export default reducers;