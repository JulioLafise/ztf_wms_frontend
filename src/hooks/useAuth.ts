import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { authAsyncThunks } from '@wms/redux/actions';
import { LocalStorageConfig } from '@wms/config';
import { Validator } from '@wms/helpers';
import { SignInDTO } from '@wms/dtos';

const useAuth = () => {
  const token = LocalStorageConfig.getItem<string>('token', 'string');
  const dispatch = useAppDispatch();

  const { isAuthenticated, user, isChecking } = useAppSelector(state => state.authReducer);

  const onSignIn = async (data: { [key: string]: any }) => {
    try {
      const [errors, signInDto] = await SignInDTO.create({ ...data, isEcommerce: false });
      if (errors) throw new Error(errors);
      const result = (await dispatch(authAsyncThunks.getSignIn(signInDto!))).payload;
      Validator.httpValidation(result as any);
      return Promise.resolve(result);
    } catch (error) {      
      return Promise.reject(error);
    }
  };

  const onSignOut = async () => {
    try {
      const result = await dispatch(authAsyncThunks.getSignOut(undefined));
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onRefreshToken = async () => {
    try {
      const result = await dispatch(authAsyncThunks.getRefreshToken(undefined));
      return Promise.resolve(result.payload);
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