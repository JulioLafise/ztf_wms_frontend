import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, MasterEntryDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/master-entry.slice';


export const getMasterEntryList = createAsyncThunk(
  'catalogue/getMasterEntryList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.masterEntryListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getMasterEntry = createAsyncThunk(
  'catalogue/getMasterEntry',
  async (masterEntryDto: MasterEntryDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.masterEntryGET({ params: masterEntryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveMasterEntry = createAsyncThunk(
  'catalogue/onSaveMasterEntry',
  async (masterEntryDto: MasterEntryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createMasterEntryPOST({ body: masterEntryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditMasterEntry = createAsyncThunk(
  'catalogue/onEditMasterEntry',
  async (masterEntryDto: MasterEntryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateMasterEntryPUT({ body: masterEntryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onFinishMasterEntry = createAsyncThunk(
  'catalogue/onFinishMasterEntry',
  async (masterEntryDto: MasterEntryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.finishMasterEntryPUT({ params: masterEntryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteMasterEntry = createAsyncThunk(
  'catalogue/onDeleteMasterEntry',
  async (masterEntryDto: MasterEntryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateMasterEntryDELETE({ body: masterEntryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
