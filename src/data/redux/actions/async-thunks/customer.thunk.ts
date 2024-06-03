import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, CustomerDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/customer.slice';


export const getCustomerList = createAsyncThunk(
  'catalogue/getCustomerList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.customerListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveCustomer = createAsyncThunk(
  'catalogue/onSaveCustomer',
  async (customerDto: CustomerDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createCustomerPOST({ body: customerDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditCustomer = createAsyncThunk(
  'catalogue/onEditCustomer',
  async (customerDto: CustomerDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateCustomerPUT({ body: customerDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteCustomer = createAsyncThunk(
  'catalogue/onDeleteCustomer',
  async (customerDto: CustomerDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateCustomerDELETE({ body: customerDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
