import { createSlice } from '@reduxjs/toolkit';
import { MasterEntryEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { masterEntryAsyncThunks } from '@wms/redux/actions';

interface IMasterEntryProps<T> extends ICatalogueProps<T> {

}

const initialState: IMasterEntryProps<MasterEntryEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const masterEntrySlice = createSlice({
  initialState,
  name: 'master-entry',
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
    // MASTER ENTRY LIST
    builder.addCase(masterEntryAsyncThunks.getMasterEntryList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(masterEntryAsyncThunks.getMasterEntryList.rejected, (state, { payload }) => {
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
} = masterEntrySlice.actions;

export default masterEntrySlice.reducer;