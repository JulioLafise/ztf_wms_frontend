import { createSlice } from '@reduxjs/toolkit';
import { DepartureTypeEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { departureTypeAsyncThunks } from '@wms/redux/actions';

interface IDepartureTypeProps<T> extends ICatalogueProps<T> {

}

const initialState: IDepartureTypeProps<DepartureTypeEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const departureTypeSlice = createSlice({
  initialState,
  name: 'departure-type',
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
    // DEPARTURE TYPE LIST
    builder.addCase(departureTypeAsyncThunks.getDepartureTypeList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(departureTypeAsyncThunks.getDepartureTypeList.rejected, (state, { payload }) => {
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
} = departureTypeSlice.actions;

export default departureTypeSlice.reducer;