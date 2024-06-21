import { createSlice } from '@reduxjs/toolkit';
import { CountryEntity } from '@wms/entities';
import { ICatalogueProps } from '@wms/interfaces';
import { countryAsyncThunks } from '@wms/redux/actions';

interface ICountryProps<T> extends ICatalogueProps<T> {
  selected: CountryEntity | null
}

const initialState: ICountryProps<CountryEntity> = {
  data: [],
  rowCount: 0,
  selected: null,
  isGenerate: false,
  error: null
};

const countrySlice = createSlice({
  initialState,
  name: 'country',
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
    builder.addCase(countryAsyncThunks.getCountryList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(countryAsyncThunks.getCountryList.rejected, (state, { payload }) => {
      state.data = [];
      state.isGenerate = true;
      state.error = payload;
    });
    // VISIT METHODS LIST
    builder.addCase(countryAsyncThunks.getCountry.fulfilled, (state, { payload }) => {
      state.selected = payload;
      state.isGenerate = true;
      state.error = undefined;
    });
    builder.addCase(countryAsyncThunks.getCountry.rejected, (state, { payload }) => {
      state.selected = null;
      state.isGenerate = true;
      state.error = payload;
    });
  },
});

export const {
  onReset,
  onRowCount,
  onGenerate
} = countrySlice.actions;

export default countrySlice.reducer;