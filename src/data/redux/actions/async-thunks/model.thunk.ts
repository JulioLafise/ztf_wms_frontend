import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, ModelDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/model.slice';


export const getModelList = createAsyncThunk(
  'catalogue/getModelList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.modelListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveModel = createAsyncThunk(
  'catalogue/onSaveModel',
  async (modelDto: ModelDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createModelPOST({ body: modelDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditModel = createAsyncThunk(
  'catalogue/onEditModel',
  async (modelDto: ModelDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateModelPUT({ body: modelDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteModel = createAsyncThunk(
  'catalogue/onDeleteModel',
  async (modelDto: ModelDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateModelDELETE({ body: modelDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
