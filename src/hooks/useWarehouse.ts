import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { warehouseAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { WarehouseEntity } from '@wms/entities';
import { PaginationDTO, WarehouseDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { WarehouseMapper } from '@wms/mappers';


const useWarehouse = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.warehouseReducer);

  const useWarehouseListQuery = (pagination: IPagination) => useQuery<WarehouseEntity[]>({
    queryKey: ['warehouse-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(warehouseAsyncThunks.getWarehouseList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return WarehouseMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useWarehouseMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<WarehouseEntity, Error, WarehouseEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, warehouseDto] = await WarehouseDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(warehouseAsyncThunks.onSaveWarehouse(warehouseDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return WarehouseMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, warehouseDto] = await WarehouseDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(warehouseAsyncThunks.onEditWarehouse(warehouseDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return WarehouseMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, warehouseDto] = await WarehouseDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(warehouseAsyncThunks.onDeleteWarehouse(warehouseDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['warehouse-list', { ...pagination }]
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
    useWarehouseListQuery,
    useWarehouseMutation
  };
};

export default useWarehouse;