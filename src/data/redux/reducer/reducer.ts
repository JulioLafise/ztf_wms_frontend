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
  masterPurchaseOrderReducer,
  colorReducer,
  entryTypeReducer,
  kitReducer
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
  masterPurchaseOrderReducer,
  colorReducer,
  entryTypeReducer,
  kitReducer
});

export default reducers;