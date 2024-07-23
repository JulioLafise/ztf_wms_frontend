import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, CategoryDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/category.slice';


export const getCategoryList = createAsyncThunk(
  'catalogue/getCategoryList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.categoryListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getCategoryKitList = createAsyncThunk(
  'catalogue/getCategoryKitList',
  async (categoryDto: CategoryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.categoryKitListGET({ params: categoryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getCategoryProductList = createAsyncThunk(
  'catalogue/getCategoryProductList',
  async (categoryDto: CategoryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.categoryProductListGET({ params: categoryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveCategory = createAsyncThunk(
  'catalogue/onSaveCategory',
  async (categoryDto: CategoryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createCategoryPOST({ body: categoryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditCategory = createAsyncThunk(
  'catalogue/onEditCategory',
  async (categoryDto: CategoryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateCategoryPUT({ body: categoryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteCategory = createAsyncThunk(
  'catalogue/onDeleteCategory',
  async (categoryDto: CategoryDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateCategoryDELETE({ params: categoryDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
