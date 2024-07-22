import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, KitDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/category.slice';


export const getKitList = createAsyncThunk(
  'catalogue/getKitList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.kitListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getKit = createAsyncThunk(
  'catalogue/getKit',
  async (kitDto: KitDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.kitGET({ params: kitDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveKit = createAsyncThunk(
  'catalogue/onSaveKit',
  async (kitDto: KitDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createKitPOST({ body: kitDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditKit = createAsyncThunk(
  'catalogue/onEditKit',
  async (kitDto: KitDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateKitPUT({ body: kitDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteKit = createAsyncThunk(
  'catalogue/onDeleteKit',
  async (kitDto: KitDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateKitDELETE({ params: kitDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
