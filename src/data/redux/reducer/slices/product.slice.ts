import { createSlice } from '@reduxjs/toolkit';
import { ProductEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { productAsyncThunks } from '@wms/redux/actions';

interface IProductProps<T> extends ICatalogueProps<T> {

}

const initialState: IProductProps<ProductEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const productSlice = createSlice({
  initialState,
  name: 'product',
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
    builder.addCase(productAsyncThunks.getProductList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(productAsyncThunks.getProductList.rejected, (state, { payload }) => {
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
} = productSlice.actions;

export default productSlice.reducer;