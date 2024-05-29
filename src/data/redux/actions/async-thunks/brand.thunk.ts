import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, BrandDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/brand.slice';


export const getBrandList = createAsyncThunk(
  'catalogue/getBrandList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.brandListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveBrand = createAsyncThunk(
  'catalogue/onSaveBrand',
  async (brandDto: BrandDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createBrandPOST({ body: brandDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditBrand = createAsyncThunk(
  'catalogue/onEditBrand',
  async (brandDto: BrandDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateBrandPUT({ body: brandDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteBrand = createAsyncThunk(
  'catalogue/onDeleteBrand',
  async (brandDto: BrandDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateBrandDELETE({ body: brandDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
