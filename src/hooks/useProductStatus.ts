import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { productStatusAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { ProductStatusEntity } from '@wms/entities';
import { PaginationDTO, ProductStatusDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { ProductStatusMapper } from '@wms/mappers';


const useProductStatus = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.productStatusReducer);

  const useProductStatusListQuery = (pagination: IPagination) => useQuery<ProductStatusEntity[]>({
    queryKey: ['product-status-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(productStatusAsyncThunks.getProductStatusList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return ProductStatusMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useProductStatusMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<ProductStatusEntity, Error, ProductStatusEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, productStatusDto] = await ProductStatusDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(productStatusAsyncThunks.onSaveProductStatus(productStatusDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ProductStatusMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, productStatusDto] = await ProductStatusDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(productStatusAsyncThunks.onEditProductStatus(productStatusDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ProductStatusMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, productStatusDto] = await ProductStatusDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(productStatusAsyncThunks.onDeleteProductStatus(productStatusDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['product-status-list', { ...pagination }]
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
    useProductStatusListQuery,
    useProductStatusMutation
  };
};

export default useProductStatus;