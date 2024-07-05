import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { entryTypeAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { EntryTypeEntity } from '@wms/entities';
import { PaginationDTO, EntryTypeDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { EntryTypeMapper } from '@wms/mappers';


const useEntryType = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.entryTypeReducer);

  const useEntryTypeListQuery = (pagination: IPagination) => useQuery<EntryTypeEntity[]>({
    queryKey: ['entry-type-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(entryTypeAsyncThunks.getEntryTypeList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return EntryTypeMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useEntryTypeMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<EntryTypeEntity, Error, EntryTypeEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, entryTypeDto] = await EntryTypeDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(entryTypeAsyncThunks.onSaveEntryType(entryTypeDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return EntryTypeMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, entryTypeDto] = await EntryTypeDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(entryTypeAsyncThunks.onEditEntryType(entryTypeDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return EntryTypeMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, entryTypeDto] = await EntryTypeDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(entryTypeAsyncThunks.onDeleteEentryType(entryTypeDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['entry-type-list', { ...pagination }]
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
    useEntryTypeListQuery,
    useEntryTypeMutation
  };
};

export default useEntryType;