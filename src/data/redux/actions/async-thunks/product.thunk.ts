import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, ProductDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/product.slice';


export const getProductList = createAsyncThunk(
  'catalogue/getProductList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.productListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getProduct = createAsyncThunk(
  'catalogue/getProduct',
  async (productDto: ProductDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.productGET({ params: productDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getProductName = createAsyncThunk(
  'catalogue/getProductName',
  async (productDto: ProductDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.productNameGET({ params: productDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveProduct = createAsyncThunk(
  'catalogue/onSaveProduct',
  async (productDto: ProductDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createProductPOST({ body: productDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditProduct = createAsyncThunk(
  'catalogue/onEditProduct',
  async (productDto: ProductDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateProductPUT({ body: productDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteProduct = createAsyncThunk(
  'catalogue/onDeleteProduct',
  async (productDto: ProductDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateProductDELETE({ body: productDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
