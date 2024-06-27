import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { masterEntryAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { MasterEntryEntity } from '@wms/entities';
import { PaginationDTO, MasterEntryDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { MasterEntryMapper } from '@wms/mappers';


const useMasterEntry = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.masterEntryReducer);

  const useMasterEntryListQuery = (pagination: IPagination) => useQuery<MasterEntryEntity[]>({
    queryKey: ['master-entry-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(masterEntryAsyncThunks.getMasterEntryList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return MasterEntryMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useMasterEntryQuery = (args: { masterEntryId: number }) => useQuery<MasterEntryEntity>({
    queryKey: ['master-entry', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, masterEntryDto] = await MasterEntryDTO.get({ ...args });
        if (errors) throw new Error(errors);
        const data = (await dispatch(masterEntryAsyncThunks.getMasterEntry(masterEntryDto!))).payload;
        Validator.httpValidation(data as any);
        return MasterEntryMapper.getItem(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useMasterEntryMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<MasterEntryEntity, Error, MasterEntryEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, masterEntryDto] = await MasterEntryDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(masterEntryAsyncThunks.onSaveMasterEntry(masterEntryDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return MasterEntryMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, masterEntryDto] = await MasterEntryDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(masterEntryAsyncThunks.onEditMasterEntry(masterEntryDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return MasterEntryMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, masterEntryDto] = await MasterEntryDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(masterEntryAsyncThunks.onDeleteMasterEntry(masterEntryDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['master-entry-list', { ...pagination }]
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
    useMasterEntryQuery,
    useMasterEntryListQuery,
    useMasterEntryMutation
  };
};

export default useMasterEntry;