import { createSlice } from '@reduxjs/toolkit';
import { BrandEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { brandAsyncThunks } from '@wms/redux/actions';

interface IBrandProps<T> extends ICatalogueProps<T> {

}

const initialState: IBrandProps<BrandEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const brandSlice = createSlice({
  initialState,
  name: 'brand',
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
    // VISIT METHODS LIST
    builder.addCase(brandAsyncThunks.getBrandList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(brandAsyncThunks.getBrandList.rejected, (state, { payload }) => {
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
} = brandSlice.actions;

export default brandSlice.reducer;