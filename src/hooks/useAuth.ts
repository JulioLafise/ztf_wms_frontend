import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { authAsyncThunks } from '@wms/redux/actions';
import { LocalStorageConfig } from '@wms/config';

const useAuth = () => {
  const token = LocalStorageConfig.getItem<string>('token', 'string');
  const dispatch = useAppDispatch();

  const { isAuthenticated, user, isChecking, isChangePassword } = useAppSelector(state => state.authReducer);

  const onSignIn = async (data: { [key: string]: any }) => {
    try {
      const result = await dispatch(authAsyncThunks.getSignIn(data));
      return Promise.resolve(result.payload);
    } catch (error) {      
      return Promise.reject(error);
    }
  };

  const onSignOut = async () => {
    try {
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onRefreshToken = async () => {
    try {
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onRefreshUser = async () => {
    try {
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    //VAR
    isAuthenticated,
    isChecking,
    isChangePassword,
    user,
    token,
    //METHODS
    onSignIn,
    onSignOut,
    onRefreshToken,
    onRefreshUser
  };
};

export default useAuth;