import { createSlice } from '@reduxjs/toolkit';
import {
  InventoryEntity,
  AvailableStockEntity,
  CustomerStockEntity
} from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { inventoryAsyncThunks } from '@wms/redux/actions';

interface IInventoryProps {
  inventory: ICatalogueProps<InventoryEntity>,
  availableStock: ICatalogueProps<AvailableStockEntity>,
  customerStock: ICatalogueProps<CustomerStockEntity>,
}

const initialState: IInventoryProps = {
  inventory: {
    data: [],
    rowCount: 0,
    isGenerate: false,
    error: null
  },
  availableStock: {
    data: [],
    rowCount: 0,
    isGenerate: false,
    error: null
  },
  customerStock: {
    data: [],
    rowCount: 0,
    isGenerate: false,
    error: null
  },
};

const inventorySlice = createSlice({
  initialState,
  name: 'inventory',
  reducers: {
    onReset: () => initialState,
    onInventoryGenerate: (state) => {
      state.inventory.isGenerate = false;
    },
    onAvailableStockGenerate: (state) => {
      state.availableStock.isGenerate = false;
    },
    onCustomerStockGenerate: (state) => {
      state.customerStock.isGenerate = false;
    },
    onInventoryRowCount : (state, { payload }) => {
      state.inventory.rowCount = payload as number;
    },
    onAvailableStockRowCount : (state, { payload }) => {
      state.availableStock.rowCount = payload as number;
    },
    onCustomerStockRowCount : (state, { payload }) => {
      state.customerStock.rowCount = payload as number;
    },
  },
  extraReducers: (builder) => {
    // INVENTORY LIST
    builder.addCase(inventoryAsyncThunks.getInventoryList.fulfilled, (state, { payload }) => {
      state.inventory.data = payload;
      state.inventory.isGenerate = true;
      state.inventory.error = undefined;
    });
    builder.addCase(inventoryAsyncThunks.getInventoryList.rejected, (state, { payload }) => {
      state.inventory.data = [];
      state.inventory.isGenerate = true;
      state.inventory.error = payload;
    });
    // AVAILABLE STOCK LIST
    builder.addCase(inventoryAsyncThunks.getAvailableStockList.fulfilled, (state, { payload }) => {
      state.availableStock.data = payload;
      state.availableStock.isGenerate = true;
      state.availableStock.error = undefined;
    });
    builder.addCase(inventoryAsyncThunks.getAvailableStockList.rejected, (state, { payload }) => {
      state.availableStock.data = [];
      state.availableStock.isGenerate = true;
      state.availableStock.error = payload;
    });
    // CUSTOMER STOCK LIST
    builder.addCase(inventoryAsyncThunks.getCustomerStockList.fulfilled, (state, { payload }) => {
      state.customerStock.data = payload;
      state.customerStock.isGenerate = true;
      state.customerStock.error = undefined;
    });
    builder.addCase(inventoryAsyncThunks.getCustomerStockList.rejected, (state, { payload }) => {
      state.customerStock.data = [];
      state.customerStock.isGenerate = true;
      state.customerStock.error = payload;
    });
  },
});

export const {
  onReset,
  onAvailableStockGenerate,
  onCustomerStockGenerate,
  onInventoryGenerate,
  onAvailableStockRowCount,
  onCustomerStockRowCount,
  onInventoryRowCount
} = inventorySlice.actions;

export default inventorySlice.reducer;