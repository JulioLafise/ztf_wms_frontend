import { createSlice } from '@reduxjs/toolkit';
import { IAuthProps } from '@wms/interfaces';
import { authAsyncThunks } from '@wms/redux/actions';

const initialState: IAuthProps = {
  user: null,
  isChecking: false,
  isAuthenticated: false,
  error: undefined
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    onReset: () => initialState,
    onChecking: (state, { payload }) => {
      state.isChecking = payload as boolean;
    },
  },
  extraReducers: (builder) => {
    // LOGIN FORM
    builder.addCase(authAsyncThunks.getSignIn.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isChecking = false;
      state.isAuthenticated = true;
      state.error = undefined;
    });
    builder.addCase(authAsyncThunks.getSignIn.rejected, (state, { payload }) => {
      state.user = null;
      state.isChecking = false;
      state.isAuthenticated = false;
      state.error = payload;
    });
    // LOGOUT
    builder.addCase(authAsyncThunks.getSignOut.fulfilled, (state, { payload }) => {
      state.user = null;
      state.isChecking = false;
      state.isAuthenticated = false;
      state.error = undefined;
    });
    builder.addCase(authAsyncThunks.getSignOut.rejected, (state, { payload }) => {
      state.user = null;
      state.isChecking = false;
      state.isAuthenticated = false;
      state.error = payload;
    });
    // REFRESH TOKEN
    builder.addCase(authAsyncThunks.getRefreshToken.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isChecking = false;
      state.isAuthenticated = true;
      state.error = undefined;
    });
    builder.addCase(authAsyncThunks.getRefreshToken.rejected, (state, { payload }) => {
      state.user = null;
      state.isChecking = false;
      state.isAuthenticated = false;      
      state.error = payload;
    });
  },
});

export const {
  onReset,
  onChecking,
} = authSlice.actions;

export default authSlice.reducer;