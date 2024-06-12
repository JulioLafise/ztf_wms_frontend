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
  featuresReducer,
  categoryReducer,
  customerReducer,
  productStatusReducer
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
  featuresReducer,
  categoryReducer,
  customerReducer,
  productStatusReducer
});

export default reducers;