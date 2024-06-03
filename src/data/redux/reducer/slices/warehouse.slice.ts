import { createSlice } from '@reduxjs/toolkit';
import { WarehouseEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { warehouseAsyncThunks } from '@wms/redux/actions';

interface IWarehouseProps<T> extends ICatalogueProps<T> {

}

const initialState: IWarehouseProps<WarehouseEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const warehouseSlice = createSlice({
  initialState,
  name: 'warehouse',
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
    builder.addCase(warehouseAsyncThunks.getWarehouseList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(warehouseAsyncThunks.getWarehouseList.rejected, (state, { payload }) => {
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
} = warehouseSlice.actions;

export default warehouseSlice.reducer;