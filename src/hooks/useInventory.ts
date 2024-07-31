import { useQuery } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { inventoryAsyncThunks } from '@wms/redux/actions';
import { IPagination } from '@wms/interfaces';
import {
  InventoryEntity,
  AvailableStockEntity,
  CustomerStockEntity
} from '@wms/entities';
import { PaginationDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import {
  InventoryMapper,
  AvailableStockMapper,
  CustomerStockMapper
} from '@wms/mappers';


const useInventory = () => {
  const dispatch = useAppDispatch();

  const { inventory, availableStock, customerStock } = useAppSelector(state => state.inventoryReducer);

  const useInventoryListQuery = (pagination: IPagination) => useQuery<InventoryEntity[]>({
    queryKey: ['inventory-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(inventoryAsyncThunks.getInventoryList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return InventoryMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useAvailableStockListQuery = (pagination: IPagination) => useQuery<AvailableStockEntity[]>({
    queryKey: ['available-stock-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(inventoryAsyncThunks.getAvailableStockList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return AvailableStockMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useCustomerStockListQuery = (pagination: IPagination) => useQuery<CustomerStockEntity[]>({
    queryKey: ['customer-stock-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(inventoryAsyncThunks.getCustomerStockList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return CustomerStockMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });


  return {
    //VAR
    inventory: {
      data: inventory.data,
      isGenerate: inventory.isGenerate,
      rowCount: inventory.count
    },
    availableStock: {
      data: availableStock.data,
      isGenerate: availableStock.isGenerate,
      rowCount: availableStock.count
    },
    customerStock: {
      data: customerStock.data,
      isGenerate: customerStock.isGenerate,
      rowCount: customerStock.count
    },
    //METHODS
    useInventoryListQuery,
    useAvailableStockListQuery,
    useCustomerStockListQuery
  };
};

export default useInventory;