import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import {
  onAvailableStockGenerate,
  onAvailableStockRowCount,
  onCustomerStockGenerate,
  onCustomerStockRowCount,
  onInventoryGenerate,
  onInventoryRowCount,
} from '../../reducer/slices/inventory.slice';


export const getInventoryList = createAsyncThunk(
  'catalogue/getInventoryList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onInventoryGenerate());
      const { data } = await WMSAPI.inventoryListGET({ params: paginationDto });
      dispatch(onInventoryRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getInventoryDepartureList = createAsyncThunk(
  'catalogue/getInventoryDepartureList',
  async (args: never, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onInventoryGenerate());
      const { data } = await WMSAPI.inventoryDepartureListGET({ params: args });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getAvailableStockList = createAsyncThunk(
  'catalogue/getAvailableStockList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onAvailableStockGenerate());
      const { data } = await WMSAPI.availableStockListGET({ params: paginationDto });
      dispatch(onAvailableStockRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getCustomerStockList = createAsyncThunk(
  'catalogue/getCustomerStockList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onCustomerStockGenerate());
      const { data } = await WMSAPI.customerStockListGET({ params: paginationDto });
      dispatch(onCustomerStockRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);