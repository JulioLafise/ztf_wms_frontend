import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, MasterDepartureDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/master-departure.slice';


export const getMasterDepartureList = createAsyncThunk(
  'catalogue/getMasterDepartureList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.masterDepartureListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getMasterDeparture = createAsyncThunk(
  'catalogue/getMasterDeparture',
  async (masterDepartureDto: MasterDepartureDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.masterDepartureGET({ params: masterDepartureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveMasterDeparture = createAsyncThunk(
  'catalogue/onSaveMasterDeparture',
  async (masterDepartureDto: MasterDepartureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createMasterDeparturePOST({ body: masterDepartureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditMasterDeparture = createAsyncThunk(
  'catalogue/onEditMasterDeparture',
  async (masterDepartureDto: MasterDepartureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateMasterDeparturePUT({ body: masterDepartureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onFinishMasterDeparture = createAsyncThunk(
  'catalogue/onFinishMasterDeparture',
  async (masterDepartureDto: MasterDepartureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.finishMasterDeparturePUT({ params: masterDepartureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteMasterDeparture = createAsyncThunk(
  'catalogue/onDeleteMasterDeparture',
  async (masterDepartureDto: MasterDepartureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateMasterDepartureDELETE({ params: masterDepartureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteMasterDepartureDetail = createAsyncThunk(
  'catalogue/onDeleteMasterDepartureDetail',
  async (masterDepartureDto: MasterDepartureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateMasterDepartureDetailDELETE({ params: masterDepartureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);