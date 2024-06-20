import { createSlice } from '@reduxjs/toolkit';
import { EmployeeEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { employeeAsyncThunks } from '@wms/redux/actions';

interface IEmployeeProps<T> extends ICatalogueProps<T> {

}

const initialState: IEmployeeProps<EmployeeEntity> = {
  data: [],
  rowCount: 0,
  isGenerate: false,
  error: null
};

const employeeSlice = createSlice({
  initialState,
  name: 'employee',
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
    builder.addCase(employeeAsyncThunks.getEmployeeList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(employeeAsyncThunks.getEmployeeList.rejected, (state, { payload }) => {
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
} = employeeSlice.actions;

export default employeeSlice.reducer;