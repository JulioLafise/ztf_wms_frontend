import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { categoryAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { CategoryEntity } from '@wms/entities';
import { PaginationDTO, CategoryDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { CategoryMapper } from '@wms/mappers';


const useCategory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.categoryReducer);

  const useCategoryListQuery = (pagination: IPagination) => useQuery<CategoryEntity[]>({
    queryKey: ['category-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(categoryAsyncThunks.getCategoryList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return CategoryMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useCategoryMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<CategoryEntity, Error, CategoryEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, categoryDto] = await CategoryDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(categoryAsyncThunks.onSaveCategory(categoryDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return CategoryMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, categoryDto] = await CategoryDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(categoryAsyncThunks.onEditCategory(categoryDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return CategoryMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, categoryDto] = await CategoryDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(categoryAsyncThunks.onDeleteCategory(categoryDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['category-list', { ...pagination }]
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
    useCategoryListQuery,
    useCategoryMutation
  };
};

export default useCategory;