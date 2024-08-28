import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { MasterAccountDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';


export const getMasterAccount = createAsyncThunk(
  'catalogue/getMasterAccount',
  async (masterAccountDto: MasterAccountDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.masterAccountGET({ params: masterAccountDto });
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onAssingMasterAccount = createAsyncThunk(
  'catalogue/onAssingMasterAccount',
  async (masterAccountDto: MasterAccountDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.assignMasterAccountPOST({ body: masterAccountDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getAccountYearList = createAsyncThunk(
  'catalogue/getAccountYearList',
  async (args: { year: number, statusId: number }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.accountYearListGET({ params: args });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);