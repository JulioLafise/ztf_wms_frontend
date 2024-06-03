import { createSlice } from '@reduxjs/toolkit';
import { CustomerEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { customerAsyncThunks } from '@wms/redux/actions';

interface ICustomerProps<T> extends ICatalogueProps<T> {

}

const initialState: ICustomerProps<CustomerEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const customerSlice = createSlice({
  initialState,
  name: 'customer',
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
    builder.addCase(customerAsyncThunks.getCustomerList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(customerAsyncThunks.getCustomerList.rejected, (state, { payload }) => {
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
} = customerSlice.actions;

export default customerSlice.reducer;