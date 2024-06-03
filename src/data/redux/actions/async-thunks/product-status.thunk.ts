import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, ProductStatusDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/product-status.slice';


export const getProductStatusList = createAsyncThunk(
  'catalogue/getProductStatusList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.productStatusListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveProductStatus = createAsyncThunk(
  'catalogue/onSaveProductStatus',
  async (productStatusDto: ProductStatusDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createProductStatusPOST({ body: productStatusDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditProductStatus = createAsyncThunk(
  'catalogue/onEditProductStatus',
  async (productStatusDto: ProductStatusDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateProductStatusPUT({ body: productStatusDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteProductStatus = createAsyncThunk(
  'catalogue/onDeleteProductStatus',
  async (productStatusDto: ProductStatusDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateProductStatusDELETE({ body: productStatusDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
