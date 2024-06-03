import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { modelAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { ModelEntity } from '@wms/entities';
import { PaginationDTO, ModelDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { ModelMapper } from '@wms/mappers';


const useModel = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.modelReducer);

  const useModelListQuery = (pagination: IPagination) => useQuery<ModelEntity[]>({
    queryKey: ['model-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(modelAsyncThunks.getModelList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return ModelMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useModelMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<ModelEntity, Error, ModelEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, modelDto] = await ModelDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(modelAsyncThunks.onSaveModel(modelDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ModelMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, modelDto] = await ModelDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(modelAsyncThunks.onEditModel(modelDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ModelMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, modelDto] = await ModelDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(modelAsyncThunks.onDeleteModel(modelDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['model-list', { ...pagination }]
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
    useModelListQuery,
    useModelMutation
  };
};

export default useModel;