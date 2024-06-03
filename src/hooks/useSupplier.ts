import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { supplierAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { SupplierEntity } from '@wms/entities';
import { PaginationDTO, SupplierDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { SupplierMapper } from '@wms/mappers';


const useSupplier = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.supplierReducer);

  const useSupplierQuery = (pagination: IPagination) => useQuery<SupplierEntity[]>({
    queryKey: ['supplier-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(supplierAsyncThunks.getSupplierList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return SupplierMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useSupplierMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<SupplierEntity, Error, SupplierEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, supplierDto] = await SupplierDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(supplierAsyncThunks.onSaveSupplier(supplierDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return SupplierMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, supplierDto] = await SupplierDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(supplierAsyncThunks.onEditSupplier(supplierDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return SupplierMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, supplierDto] = await SupplierDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(supplierAsyncThunks.onDeleteSupplier(supplierDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['supplier-list', { ...pagination }]
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
    useSupplierQuery,
    useSupplierMutation
  };
};

export default useSupplier;