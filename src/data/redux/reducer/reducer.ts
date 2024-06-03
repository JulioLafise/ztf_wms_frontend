import { combineReducers } from '@reduxjs/toolkit';
import {
  authReducer,
  uiReducer,
  userReducer,
  unitMeasureReducer,
  brandReducer,
  modelReducer,
  countryReducer,
  warehouseReducer,
  supplierReducer,
  featuresReducer
} from './slices';

const reducers = combineReducers({
  authReducer,
  uiReducer,
  userReducer,
  unitMeasureReducer,
  brandReducer,
  modelReducer,
  countryReducer,
  warehouseReducer,
  supplierReducer,
  featuresReducer
});

export default reducers;