import { useQuery } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { inventoryAsyncThunks } from '@wms/redux/actions';
import { IPagination } from '@wms/interfaces';
import { InventoryEntity } from '@wms/entities';
import { PaginationDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { InventoryMapper } from '@wms/mappers';


const useInventory = () => {
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.inventoryReducer);

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


  return {
    //VAR
    data,
    isGenerate,
    rowCount,
    //METHODS
    useInventoryListQuery,
  };
};

export default useInventory;