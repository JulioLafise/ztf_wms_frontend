import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { colorAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { CategoryEntity } from '@wms/entities';
import { PaginationDTO, ColorDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { ColorMapper } from '@wms/mappers';


const useColor = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.colorReducer);

  const useColorListQuery = (pagination: IPagination) => useQuery<CategoryEntity[]>({
    queryKey: ['color-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(colorAsyncThunks.getColorList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return ColorMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useColorMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<CategoryEntity, Error, CategoryEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, colorDto] = await ColorDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(colorAsyncThunks.onSaveColor(colorDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ColorMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, colorDto] = await ColorDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(colorAsyncThunks.onEditColor(colorDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ColorMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, colorDto] = await ColorDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(colorAsyncThunks.onDeleteColor(colorDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['color-list', { ...pagination }]
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
    useColorListQuery,
    useColorMutation
  };
};

export default useColor;