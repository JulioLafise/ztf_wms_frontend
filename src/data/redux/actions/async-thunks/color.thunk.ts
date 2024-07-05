import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, ColorDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/color.slice';


export const getColorList = createAsyncThunk(
  'catalogue/getColorList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.colorListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveColor = createAsyncThunk(
  'catalogue/onSaveColor',
  async (colorDto: ColorDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createColorPOST({ body: colorDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditColor = createAsyncThunk(
  'catalogue/onEditColor',
  async (colorDto: ColorDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateColorPUT({ body: colorDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteColor = createAsyncThunk(
  'catalogue/onDeleteColor',
  async (colorDto: ColorDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateColorDELETE({ body: colorDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
