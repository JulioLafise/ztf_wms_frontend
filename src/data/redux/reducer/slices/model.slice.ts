import { createSlice } from '@reduxjs/toolkit';
import { ModelEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { modelAsyncThunks } from '@wms/redux/actions';

interface IModelProps<T> extends ICatalogueProps<T> {

}

const initialState: IModelProps<ModelEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const modelSlice = createSlice({
  initialState,
  name: 'model',
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
    builder.addCase(modelAsyncThunks.getModelList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(modelAsyncThunks.getModelList.rejected, (state, { payload }) => {
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
} = modelSlice.actions;

export default modelSlice.reducer;