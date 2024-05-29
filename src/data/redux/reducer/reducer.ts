import { combineReducers } from '@reduxjs/toolkit';
import {
  authReducer,
  uiReducer,
  userReducer,
  unitMeasureReducer,
  brandReducer,
  modelReducer,
  countryReducer
} from './slices';

const reducers = combineReducers({
  authReducer,
  uiReducer,
  userReducer,
  unitMeasureReducer,
  brandReducer,
  modelReducer,
  countryReducer
});

export default reducers;