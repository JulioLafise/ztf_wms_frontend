import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { WMSAPI } from '@wms/apis';
import { UsersDTO } from '@wms/dtos';
import { onGenerate, onRowCount } from '../../reducer/slices/user.slice';



export const getUsersList = createAsyncThunk(
  'catalogue/getUsersList',
  async (args: {}, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.usersListGET({ params: { isEcommerce: false } });
      dispatch(onRowCount(data.length));
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getUser = createAsyncThunk(
  'catalogue/getUser',
  async (usersDto: UsersDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.userGET({ params: usersDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);