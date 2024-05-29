import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, UnitMeasureDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/unit-measure.slice';


export const getUnitMeasureList = createAsyncThunk(
  'catalogue/getUnitMeasureList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.unitMeasureListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveUnitMeasure = createAsyncThunk(
  'catalogue/onSaveUnitMeasure',
  async (unitMeasureDto: UnitMeasureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createUnitMeasurePOST({ body: unitMeasureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditUnitMeasure = createAsyncThunk(
  'catalogue/onEditUnitMeasure',
  async (unitMeasureDto: UnitMeasureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateUnitMeasurePUT({ body: unitMeasureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteUnitMeasure = createAsyncThunk(
  'catalogue/onDeleteUnitMeasure',
  async (unitMeasureDto: UnitMeasureDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateUnitMeasureDELETE({ body: unitMeasureDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
