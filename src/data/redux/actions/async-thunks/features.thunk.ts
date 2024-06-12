import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, FeaturesDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/features.slice';


export const getFeaturesList = createAsyncThunk(
  'catalogue/getFeaturesList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.featuresListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveFeatures = createAsyncThunk(
  'catalogue/onSaveFeatures',
  async (featuresDto: FeaturesDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createFeaturesPOST({ body: featuresDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditFeatures = createAsyncThunk(
  'catalogue/onEditFeatures',
  async (featuresDto: FeaturesDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateFeaturesPUT({ body: featuresDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteFeatures = createAsyncThunk(
  'catalogue/onDeleteFeatures',
  async (featuresDto: FeaturesDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateFeaturesDELETE({ body: featuresDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
