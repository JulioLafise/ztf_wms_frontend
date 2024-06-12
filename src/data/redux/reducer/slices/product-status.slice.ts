import { createSlice } from '@reduxjs/toolkit';
import { ProductStatusEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { productStatusAsyncThunks } from '@wms/redux/actions';

interface IProductStatusProps<T> extends ICatalogueProps<T> {

}

const initialState: IProductStatusProps<ProductStatusEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const productStatusSlice = createSlice({
  initialState,
  name: 'product-status',
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
    builder.addCase(productStatusAsyncThunks.getProductStatusList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(productStatusAsyncThunks.getProductStatusList.rejected, (state, { payload }) => {
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
} = productStatusSlice.actions;

export default productStatusSlice.reducer;