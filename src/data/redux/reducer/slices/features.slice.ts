import { createSlice } from '@reduxjs/toolkit';
import { FeaturesEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { featuresAsyncThunks } from '@wms/redux/actions';

interface IFeaturesProps<T> extends ICatalogueProps<T> {

}

const initialState: IFeaturesProps<FeaturesEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const featuresSlice = createSlice({
  initialState,
  name: 'features',
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
    builder.addCase(featuresAsyncThunks.getFeaturesList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(featuresAsyncThunks.getFeaturesList.rejected, (state, { payload }) => {
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
} = featuresSlice.actions;

export default featuresSlice.reducer;