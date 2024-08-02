import { createSlice } from '@reduxjs/toolkit';
import { MasterDepartureEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { masterDepartureAsyncThunks } from '@wms/redux/actions';

interface IMasterDepartureProps<T> extends ICatalogueProps<T> {

}

const initialState: IMasterDepartureProps<MasterDepartureEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const masterDepartureSlice = createSlice({
  initialState,
  name: 'master-departure',
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
    // MASTER ENTRY LIST
    builder.addCase(masterDepartureAsyncThunks.getMasterDepartureList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(masterDepartureAsyncThunks.getMasterDepartureList.rejected, (state, { payload }) => {
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
} = masterDepartureSlice.actions;

export default masterDepartureSlice.reducer;