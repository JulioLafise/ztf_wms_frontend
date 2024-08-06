import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { userAsyncThunks, authSyncThunks } from '@wms/redux/actions';
import { UserEntity } from '@wms/entities';
import { UsersDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { UserMapper } from '@wms/mappers';


const useUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.userReducer);

  const useUsersListQuery = () => useQuery<UserEntity[]>({
    queryKey: ['users-list'],    
    queryFn: async () => {
      try {
        const data = (await dispatch(userAsyncThunks.getUsersList(undefined))).payload;
        Validator.httpValidation(data as any);
        return UserMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useUserQuery = (args: { userId: string }) => useQuery<UserEntity>({
    queryKey: ['user', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, usersDto] = await UsersDTO.get({ ...args });
        if (errors) throw new Error(errors);
        const data = (await dispatch(userAsyncThunks.getUser(usersDto!))).payload;
        Validator.httpValidation(data as any);
        const result = UserMapper.getItem(data);
        dispatch(authSyncThunks.updateUser(result));
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useUserMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<UserEntity, Error, UserEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {

        return {};
      }
      if (options?.typeMutation === 'put') {
        const [errors, usersDto] = await UsersDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const resp = (await dispatch(userAsyncThunks.onEditUser(usersDto!))).payload;
        Validator.httpValidation(resp as any);
        const result = UserMapper.getItem(resp);
        dispatch(authSyncThunks.updateUser(result));
        return result;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['users-list', { ...pagination }]
      });
      return data;
    }
  });


  return {
    //VAR
    data,
    isGenerate,
    rowCount,
    //METHODS
    useUsersListQuery,
    useUserQuery,
    useUserMutation
  };
};

export default useUser;