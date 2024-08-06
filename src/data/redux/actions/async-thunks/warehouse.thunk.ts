import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, WarehouseDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/model.slice';


export const getWarehouseList = createAsyncThunk(
  'catalogue/getWarehouseList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.warehouseListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveWarehouse = createAsyncThunk(
  'catalogue/onSaveWarehouse',
  async (warehouseDto: WarehouseDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createWarehousePOST({ body: warehouseDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditWarehouse = createAsyncThunk(
  'catalogue/onEditWarehouse',
  async (warehouseDto: WarehouseDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateWarehousePUT({ body: warehouseDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteWarehouse = createAsyncThunk(
  'catalogue/onDeleteWarehouse',
  async (warehouseDto: WarehouseDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateWarehouseDELETE({ body: warehouseDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
