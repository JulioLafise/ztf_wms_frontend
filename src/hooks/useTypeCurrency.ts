import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { typeCurrencyAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { TypeCurrencyEntity } from '@wms/entities';
import { PaginationDTO, TypeCurrencyDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { TypeCurrencyMapper } from '@wms/mappers';


const useTypeCurrency = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.typeCurrencyReducer);

  const useTypeCurrencyListQuery = (pagination: IPagination) => useQuery<TypeCurrencyEntity[]>({
    queryKey: ['type-currency-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(typeCurrencyAsyncThunks.getTypeCurrencyList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return TypeCurrencyMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useTypeCurrencyMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<TypeCurrencyEntity, Error, TypeCurrencyEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, typeCurrencyDto] = await TypeCurrencyDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(typeCurrencyAsyncThunks.onSaveTypeCurrency(typeCurrencyDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return TypeCurrencyMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, typeCurrencyDto] = await TypeCurrencyDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(typeCurrencyAsyncThunks.onEditTypeCurrency(typeCurrencyDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return TypeCurrencyMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, typeCurrencyDto] = await TypeCurrencyDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(typeCurrencyAsyncThunks.onDeleteTypeCurrency(typeCurrencyDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['type-currency-list', { ...pagination }]
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
    useTypeCurrencyListQuery,
    useTypeCurrencyMutation
  };
};

export default useTypeCurrency;