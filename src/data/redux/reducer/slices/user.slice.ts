import { createSlice } from '@reduxjs/toolkit';
import { ICatalogueProps } from '@wms/interfaces';
import { userAsyncThunks } from '@wms/redux/actions';
import { UserEntity } from '@wms/entities';

const initialState: ICatalogueProps<UserEntity> = {
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
    builder.addCase(userAsyncThunks.getUsersList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(userAsyncThunks.getUsersList.rejected, (state, { payload }) => {
      state.data = [];
      state.isGenerate = true;
      state.error = payload;
    });
  },
});

export const {
  onReset,
  onRowCount,
  onGenerate
} = userSlice.actions;

export default userSlice.reducer;