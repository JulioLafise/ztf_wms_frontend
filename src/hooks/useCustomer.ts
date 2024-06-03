import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { customerAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { CustomerEntity } from '@wms/entities';
import { PaginationDTO, CustomerDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { CustomerMapper } from '@wms/mappers';


const useCustomer = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.customerReducer);

  const useCustomerQuery = (pagination: IPagination) => useQuery<CustomerEntity[]>({
    queryKey: ['customer-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(customerAsyncThunks.getCustomerList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return CustomerMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useCustomerMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<CustomerEntity, Error, CustomerEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, customerDto] = await CustomerDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(customerAsyncThunks.onSaveCustomer(customerDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return CustomerMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, customerDto] = await CustomerDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(customerAsyncThunks.onEditCustomer(customerDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return CustomerMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, customerDto] = await CustomerDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(customerAsyncThunks.onDeleteCustomer(customerDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['customer-list', { ...pagination }]
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
    useCustomerQuery,
    useCustomerMutation
  };
};

export default useCustomer;