import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { masterDepartureAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { MasterDepartureEntity } from '@wms/entities';
import { PaginationDTO, MasterDepartureDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { MasterDepartureMapper } from '@wms/mappers';


const useMasterDeparture = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.masterDepartureReducer);

  const useMasterEntryListQuery = (pagination: IPagination) => useQuery<MasterDepartureEntity[]>({
    queryKey: ['master-departure-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(masterDepartureAsyncThunks.getMasterDepartureList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return MasterDepartureMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useMasterEntryQuery = (args: { masterEntryId: number }) => useQuery<MasterDepartureEntity>({
    queryKey: ['master-departure', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, masterDepartureDto] = await MasterDepartureDTO.get({ ...args });
        if (errors) throw new Error(errors);
        const data = (await dispatch(masterDepartureAsyncThunks.getMasterDeparture(masterDepartureDto!))).payload;
        Validator.httpValidation(data as any);
        return MasterDepartureMapper.getItem(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useMasterEntryMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<MasterDepartureEntity, Error, MasterDepartureEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, masterDepartureDto] = await MasterDepartureDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(masterDepartureAsyncThunks.onSaveMasterDeparture(masterDepartureDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return MasterDepartureMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, masterDepartureDto] = await MasterDepartureDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(masterDepartureAsyncThunks.onEditMasterDeparture(masterDepartureDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return MasterDepartureMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, masterDepartureDto] = await MasterDepartureDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(masterDepartureAsyncThunks.onDeleteMasterDeparture(masterDepartureDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['master-departure-list', { ...pagination }]
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

export default useMasterDeparture;