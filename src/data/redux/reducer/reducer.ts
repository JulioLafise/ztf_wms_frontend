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
  productStatusReducer,
  typeCurrencyReducer,
  employeeReducer,
  productReducer,
  inventoryReducer,
  masterEntryReducer,
  colorReducer,
  entryTypeReducer
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
  productStatusReducer,
  typeCurrencyReducer,
  employeeReducer,
  productReducer,
  inventoryReducer,
  masterEntryReducer,
  colorReducer,
  entryTypeReducer
});

export default reducers;