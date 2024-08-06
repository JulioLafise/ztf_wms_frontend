import { AppDispatch } from '../../store/store';
import { UserEntity } from '@wms/entities';
import {
  onUser
} from '../../../redux/reducer/slices/auth.slice';

export const updateUser = (data: UserEntity) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch(onUser(data));
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
};