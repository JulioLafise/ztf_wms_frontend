import { createSlice } from '@reduxjs/toolkit';
import { TypeCurrencyEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { typeCurrencyAsyncThunks } from '@wms/redux/actions';

interface ITypeCurrencyProps<T> extends ICatalogueProps<T> {

}

const initialState: ITypeCurrencyProps<TypeCurrencyEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const typeCurrencySlice = createSlice({
  initialState,
  name: 'type-currency',
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
    builder.addCase(typeCurrencyAsyncThunks.getTypeCurrencyList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(typeCurrencyAsyncThunks.getTypeCurrencyList.rejected, (state, { payload }) => {
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
} = typeCurrencySlice.actions;

export default typeCurrencySlice.reducer;