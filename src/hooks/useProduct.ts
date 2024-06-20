import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { productAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { ProductEntity } from '@wms/entities';
import { PaginationDTO, ProductDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { ProductMapper } from '@wms/mappers';

type OptionProductName = { productId?: never, name?: string };
type OptionProductID = { productId?: string, name?: never };

const useProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.productReducer);

  const useProductListQuery = (pagination: IPagination) => useQuery<ProductEntity[]>({
    queryKey: ['product-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(productAsyncThunks.getProductList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return ProductMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useProductQuery = (args: OptionProductName | OptionProductID) => useQuery<ProductEntity>({
    queryKey: ['product', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, productDto] = await ProductDTO.get({ ...args });
        if (errors) throw new Error(errors);
        if (Object.hasOwn(args, 'name')) {
          const data = (await dispatch(productAsyncThunks.getProductName(productDto!))).payload;
          Validator.httpValidation(data as any);
          return ProductMapper.getItem(data);
        }
        const data = (await dispatch(productAsyncThunks.getProduct(productDto!))).payload;
        Validator.httpValidation(data as any);
        return ProductMapper.getItem(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useProductMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<ProductEntity, Error, ProductEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, productDto] = await ProductDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(productAsyncThunks.onSaveProduct(productDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ProductMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, productDto] = await ProductDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(productAsyncThunks.onEditProduct(productDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return ProductMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, productDto] = await ProductDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(productAsyncThunks.onDeleteProduct(productDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['product-list', { ...pagination }]
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
    useProductListQuery,
    useProductQuery,
    useProductMutation
  };
};

export default useProduct;