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
type ContentsDelete = 'images' | 'colors' | 'dimensions' | 'details' 

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

  const useProductQuery = (args: OptionProductID) => useQuery<ProductEntity>({
    queryKey: ['product', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, productDto] = await ProductDTO.get({ ...args });
        if (errors) throw new Error(errors);
        // if (Object.hasOwn(args, 'name')) {
        //   const data = (await dispatch(productAsyncThunks.getProductName(productDto!))).payload;
        //   Validator.httpValidation(data as any);
        //   return ProductMapper.getItem(data);
        // }
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

  const filterProductExistByName = async (args: { name: string }): Promise<boolean> => {
    const data = (await dispatch(productAsyncThunks.getProductName(args))).payload as { message: string, exist: boolean };
    Validator.httpValidation(data as any);
    return data.exist;
  };


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

  const useProductIsEcommerceMutation = (pagination?: IPagination) => useMutation<ProductEntity, Error, ProductEntity>({
    mutationFn: async (data) => { 
      const [errors, productDto] = await ProductDTO.updated({ ...data });
      if (errors) throw new Error(errors);
      const dataNew = (await dispatch(productAsyncThunks.onEditProductIsEcommerce(productDto!))).payload;
      Validator.httpValidation(dataNew as any);
      if (dataNew) {
        return {...data, isEcommerce: !data.isEcommerce };
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

  const useProductEliminateItemsMutation = (contents: ContentsDelete[]) => useMutation<boolean, Error, ProductEntity>({
    mutationFn: async (data) => {
      if (data.productId) {
        if (data.productId <= 0) return true;
        const [errors, productDto] = await ProductDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        if (contents.includes('colors')) {
          const values = (await dispatch(productAsyncThunks.onDeleteProductColors(productDto!))).payload;
          Validator.httpValidation(values as any);
        }
        if (contents.includes('images')) {
          const values = (await dispatch(productAsyncThunks.onDeleteProductImages(productDto!))).payload;
          Validator.httpValidation(values as any);
        }
        if (contents.includes('dimensions')) {
          const values = (await dispatch(productAsyncThunks.onDeleteProductDimensions(productDto!))).payload;
          Validator.httpValidation(values as any);
        }
        if (contents.includes('details')) {
          const values = (await dispatch(productAsyncThunks.onDeleteProductDetails(productDto!))).payload;
          Validator.httpValidation(values as any);
        }
      }
      return true;
    },
    onSuccess: (data) => {
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
    useProductMutation,
    useProductIsEcommerceMutation,
    useProductEliminateItemsMutation,
    filterProductExistByName
  };
};

export default useProduct;