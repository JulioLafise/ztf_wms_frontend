import { createSlice } from '@reduxjs/toolkit';
import { UnitMeasureEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { unitMeasureAsyncThunks } from '@wms/redux/actions';

interface IUnitMeasureProps<T> extends ICatalogueProps<T> {

}

const initialState: IUnitMeasureProps<UnitMeasureEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const unitMeasureSlice = createSlice({
  initialState,
  name: 'unit-measure',
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
    builder.addCase(unitMeasureAsyncThunks.getUnitMeasureList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(unitMeasureAsyncThunks.getUnitMeasureList.rejected, (state, { payload }) => {
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
} = unitMeasureSlice.actions;

export default unitMeasureSlice.reducer;