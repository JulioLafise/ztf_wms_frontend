import { createSlice } from '@reduxjs/toolkit';
import { InventoryEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { inventoryAsyncThunks } from '@wms/redux/actions';

interface IInventoryProps<T> extends ICatalogueProps<T> {

}

const initialState: IInventoryProps<InventoryEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const inventorySlice = createSlice({
  initialState,
  name: 'inventory',
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
    builder.addCase(inventoryAsyncThunks.getInventoryList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(inventoryAsyncThunks.getInventoryList.rejected, (state, { payload }) => {
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
} = inventorySlice.actions;

export default inventorySlice.reducer;