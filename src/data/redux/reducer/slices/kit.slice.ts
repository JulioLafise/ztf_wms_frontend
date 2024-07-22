import { createSlice } from '@reduxjs/toolkit';
import { KitEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { kitAsyncThunks } from '@wms/redux/actions';

interface IKitProps<T> extends ICatalogueProps<T> {

}

const initialState: IKitProps<KitEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const kitSlice = createSlice({
  initialState,
  name: 'kit',
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
    builder.addCase(kitAsyncThunks.getKitList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(kitAsyncThunks.getKitList.rejected, (state, { payload }) => {
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
} = kitSlice.actions;

export default kitSlice.reducer;