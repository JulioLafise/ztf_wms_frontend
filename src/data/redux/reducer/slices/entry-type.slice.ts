import { createSlice } from '@reduxjs/toolkit';
import { BrandEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { entryTypeAsyncThunks } from '@wms/redux/actions';

interface IEntryTypeProps<T> extends ICatalogueProps<T> {

}

const initialState: IEntryTypeProps<BrandEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const entryTypeSlice = createSlice({
  initialState,
  name: 'entry-type',
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
    // ENTRY TYPE LIST
    builder.addCase(entryTypeAsyncThunks.getEntryTypeList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(entryTypeAsyncThunks.getEntryTypeList.rejected, (state, { payload }) => {
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
} = entryTypeSlice.actions;

export default entryTypeSlice.reducer;