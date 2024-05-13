import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IPagination, IOptionsQuery } from '@wms/interfaces';

interface IOptionsQueryPassword extends IOptionsQuery {
  password: 'reset' | 'update'
}


const useUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.userReducer);

  const useUsersListQuery = (pagination: IPagination) => useQuery<any[]>({
    queryKey: ['users-list', { ...pagination }],    
    queryFn: async () => {
      try {

        return [];
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useUserMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<any, Error, any>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {

        return {};
      }
      if (options?.typeMutation === 'put') {
        return {};
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

  const useChangePasswordUserMutation = (pagination?: IPagination, options?: IOptionsQueryPassword) => useMutation<any, Error, any>({
    mutationFn: async (data) => { 
      if (options?.password === 'reset') {
        return {};
      }
      if (options?.password === 'update') {
        return {};
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
    useUserMutation,
    useChangePasswordUserMutation
  };
};

export default useUser;