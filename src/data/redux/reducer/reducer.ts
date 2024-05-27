import { combineReducers } from '@reduxjs/toolkit';
import {
  authReducer,
  uiReducer,
  userReducer,
  unitMeasureReducer
} from './slices';

const reducers = combineReducers({
  authReducer,
  uiReducer,
  userReducer,
  unitMeasureReducer
});

export default reducers;