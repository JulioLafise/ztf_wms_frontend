import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { brandAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { BrandEntity } from '@wms/entities';
import { PaginationDTO, BrandDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { BrandMapper } from '@wms/mappers';


const useBrand = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.brandReducer);

  const useBrandListQuery = (pagination: IPagination) => useQuery<BrandEntity[]>({
    queryKey: ['brand-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(brandAsyncThunks.getBrandList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return BrandMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useBrandMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<BrandEntity, Error, BrandEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, brandDto] = await BrandDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(brandAsyncThunks.onSaveBrand(brandDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return BrandMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, brandDto] = await BrandDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(brandAsyncThunks.onEditBrand(brandDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return BrandMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, brandDto] = await BrandDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(brandAsyncThunks.onDeleteBrand(brandDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['brand-list', { ...pagination }]
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
    useBrandListQuery,
    useBrandMutation
  };
};

export default useBrand;