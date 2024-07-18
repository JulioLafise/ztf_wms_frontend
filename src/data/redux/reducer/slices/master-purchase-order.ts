import { createSlice } from '@reduxjs/toolkit';
import { MasterPurchaseOrderEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { masterPurchaseOrderAsyncThunks } from '@wms/redux/actions';

interface IMasterPurchaseOrderProps<T> extends ICatalogueProps<T> {

}

const initialState: IMasterPurchaseOrderProps<MasterPurchaseOrderEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const masterPurchaseOrderSlice = createSlice({
  initialState,
  name: 'master-purchase-order',
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
    // MASTER PURCHASE ORDER LIST
    builder.addCase(masterPurchaseOrderAsyncThunks.getMasterPurchaseOrderList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(masterPurchaseOrderAsyncThunks.getMasterPurchaseOrderList.rejected, (state, { payload }) => {
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
} = masterPurchaseOrderSlice.actions;

export default masterPurchaseOrderSlice.reducer;