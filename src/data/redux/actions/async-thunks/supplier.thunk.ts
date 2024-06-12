import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, SupplierDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/supplier.slice';


export const getSupplierList = createAsyncThunk(
  'catalogue/getSupplierList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.supplierListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveSupplier = createAsyncThunk(
  'catalogue/onSaveSupplier',
  async (supplierDto: SupplierDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createSupplierPOST({ body: supplierDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditSupplier = createAsyncThunk(
  'catalogue/onEditSupplier',
  async (supplierDto: SupplierDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateSupplierPUT({ body: supplierDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteSupplier = createAsyncThunk(
  'catalogue/onDeleteSupplier',
  async (supplierDto: SupplierDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateSupplierDELETE({ body: supplierDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
