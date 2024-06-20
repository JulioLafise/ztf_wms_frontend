import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, TypeCurrencyDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/type-currency.slice';


export const getTypeCurrencyList = createAsyncThunk(
  'catalogue/getTypeCurrencyList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.typeCurrencyListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveTypeCurrency= createAsyncThunk(
  'catalogue/onSaveTypeCurrency',
  async (typeCurrencyDto: TypeCurrencyDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createTypeCurrencyPOST({ body: typeCurrencyDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditTypeCurrency = createAsyncThunk(
  'catalogue/onEditTypeCurrency',
  async (typeCurrencyDto: TypeCurrencyDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateTypeCurrencyPUT({ body: typeCurrencyDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteTypeCurrency = createAsyncThunk(
  'catalogue/onDeleteTypeCurrency',
  async (typeCurrencyDto: TypeCurrencyDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateTypeCurrencyDELETE({ body: typeCurrencyDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
