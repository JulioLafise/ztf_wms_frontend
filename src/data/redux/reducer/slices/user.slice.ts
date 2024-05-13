import { createSlice } from '@reduxjs/toolkit';
import { ICatalogueProps } from '@wms/interfaces';
import {  } from '@wms/redux/actions';

const initialState: ICatalogueProps<any> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    onReset: () => initialState,
    onGenerate: (state) => {
      state.isGenerate = false;
    },
    onRowCount : (state, { payload }) => {
      state.rowCount = payload as number;
    },
  },
  extraReducers: (builder) => {
    // USERS LIST

  },
});

export const {
  onReset,
  onRowCount,
  onGenerate
} = userSlice.actions;

export default userSlice.reducer;