import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { masterAccountAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import {  } from '@wms/entities';
import { PaginationDTO, MasterAccountDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import {  } from '@wms/mappers';


const useMasterAccount = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const useMasterAccountQuery = (args: { masterAccountId: number }) => useQuery<any>({
    queryKey: ['master-account', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, masterAccountDto] = await MasterAccountDTO.get({ ...args });
        if (errors) throw new Error(errors);
        const data = (await dispatch(masterAccountAsyncThunks.getMasterAccount(masterAccountDto!))).payload;
        Validator.httpValidation(data as any);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  
  const useMasterAccountMutation = (pagination?: IPagination) => useMutation<boolean, Error, any>({
    mutationFn: async (data) => {
      const [errors, masterAccountDto] = await MasterAccountDTO.created({ ...data });
      if (errors) throw new Error(errors);
      const dataNew = (await dispatch(masterAccountAsyncThunks.onAssingMasterAccount(masterAccountDto!))).payload;
      Validator.httpValidation(dataNew as any);
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['master-account', { ...pagination }]
      });
      return data;
    }
  });


  return {
    //VAR

    //METHODS
    useMasterAccountQuery,
    useMasterAccountMutation
  };
};

export default useMasterAccount;