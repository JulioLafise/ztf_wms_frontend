import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { featuresAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { FeaturesEntity } from '@wms/entities';
import { PaginationDTO, FeaturesDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { FeaturesMapper } from '@wms/mappers';


const useFeatures = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.featuresReducer);

  const useFeaturesQuery = (pagination: IPagination) => useQuery<FeaturesEntity[]>({
    queryKey: ['features-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(featuresAsyncThunks.getFeaturesList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return FeaturesMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useFeaturesMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<FeaturesEntity, Error, FeaturesEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, featuresDto] = await FeaturesDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(featuresAsyncThunks.onSaveFeatures(featuresDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return FeaturesMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, featuresDto] = await FeaturesDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(featuresAsyncThunks.onEditFeatures(featuresDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return FeaturesMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, featuresDto] = await FeaturesDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(featuresAsyncThunks.onDeleteFeatures(featuresDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['features-list', { ...pagination }]
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
    useFeaturesQuery,
    useFeaturesMutation
  };
};

export default useFeatures;