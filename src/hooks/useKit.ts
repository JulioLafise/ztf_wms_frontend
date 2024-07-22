import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { kitAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { KitEntity } from '@wms/entities';
import { PaginationDTO, KitDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { KitMapper } from '@wms/mappers';


const useKit = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.kitReducer);

  const useKitListQuery = (pagination: IPagination) => useQuery<KitEntity[]>({
    queryKey: ['kit-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(kitAsyncThunks.getKitList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return KitMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  
  const useKitQuery = (args: { kitId: number }) => useQuery<KitEntity>({
    queryKey: ['kit', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, kitDto] = await KitDTO.get({ ...args });
        if (errors) throw new Error(errors);
        const data = (await dispatch(kitAsyncThunks.getKit(kitDto!))).payload;
        Validator.httpValidation(data as any);
        return KitMapper.getItem(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useKitMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<KitEntity, Error, KitEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, kitDto] = await KitDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(kitAsyncThunks.onSaveKit(kitDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return KitMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, kitDto] = await KitDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(kitAsyncThunks.onEditKit(kitDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return KitMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, kitDto] = await KitDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(kitAsyncThunks.onDeleteKit(kitDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['kit-list', { ...pagination }]
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
    useKitListQuery,
    useKitQuery,
    useKitMutation
  };
};

export default useKit;