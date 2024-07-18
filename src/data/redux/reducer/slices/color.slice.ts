import { createSlice } from '@reduxjs/toolkit';
import { ColorEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { colorAsyncThunks } from '@wms/redux/actions';

interface IColorProps<T> extends ICatalogueProps<T> {

}

const initialState: IColorProps<ColorEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const colorSlice = createSlice({
  initialState,
  name: 'color',
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
    // COLOR LIST
    builder.addCase(colorAsyncThunks.getColorList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(colorAsyncThunks.getColorList.rejected, (state, { payload }) => {
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
} = colorSlice.actions;

export default colorSlice.reducer;