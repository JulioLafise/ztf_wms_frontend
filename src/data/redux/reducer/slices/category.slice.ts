import { createSlice } from '@reduxjs/toolkit';
import { CategoryEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { categoryAsyncThunks } from '@wms/redux/actions';

interface ICategoryProps<T> extends ICatalogueProps<T> {

}

const initialState: ICategoryProps<CategoryEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const categorySlice = createSlice({
  initialState,
  name: 'category',
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
    builder.addCase(categoryAsyncThunks.getCategoryList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(categoryAsyncThunks.getCategoryList.rejected, (state, { payload }) => {
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
} = categorySlice.actions;

export default categorySlice.reducer;