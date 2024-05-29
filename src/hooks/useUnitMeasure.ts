import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { unitMeasureAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { UnitMeasureEntity } from '@wms/entities';
import { PaginationDTO, UnitMeasureDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { UnitMeasureMapper } from '@wms/mappers';


const useUnitMeasure = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.unitMeasureReducer);

  const useUnitMeasureListQuery = (pagination: IPagination) => useQuery<UnitMeasureEntity[]>({
    queryKey: ['unit-measure-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(unitMeasureAsyncThunks.getUnitMeasureList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return UnitMeasureMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useUnitMeasureMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<UnitMeasureEntity, Error, UnitMeasureEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, unitMeasureDto] = await UnitMeasureDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(unitMeasureAsyncThunks.onSaveUnitMeasure(unitMeasureDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return UnitMeasureMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, unitMeasureDto] = await UnitMeasureDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(unitMeasureAsyncThunks.onEditUnitMeasure(unitMeasureDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return UnitMeasureMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, unitMeasureDto] = await UnitMeasureDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(unitMeasureAsyncThunks.onDeleteUnitMeasure(unitMeasureDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['unit-measure-list', { ...pagination }]
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
    useUnitMeasureListQuery,
    useUnitMeasureMutation
  };
};

export default useUnitMeasure;