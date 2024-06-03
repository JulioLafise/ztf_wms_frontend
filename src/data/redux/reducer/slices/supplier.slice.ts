import { createSlice } from '@reduxjs/toolkit';
import { SupplierEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { supplierAsyncThunks } from '@wms/redux/actions';

interface ISupplierProps<T> extends ICatalogueProps<T> {

}

const initialState: ISupplierProps<SupplierEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const supplierSlice = createSlice({
  initialState,
  name: 'supplier',
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
    builder.addCase(supplierAsyncThunks.getSupplierList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(supplierAsyncThunks.getSupplierList.rejected, (state, { payload }) => {
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
} = supplierSlice.actions;

export default supplierSlice.reducer;