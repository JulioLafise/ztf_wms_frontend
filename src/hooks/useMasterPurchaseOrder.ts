import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { masterPurchaseOrderAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { MasterPurchaseOrderEntity, PurchaseOrderYearEntity } from '@wms/entities';
import { PaginationDTO, MasterPurchaseOrderDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { MasterPurchaseOrderMapper } from '@wms/mappers';


const useMasterPurchaseOrder = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.masterPurchaseOrderReducer);

  const useMasterPurchaseOrderListQuery = (pagination: IPagination) => useQuery<MasterPurchaseOrderEntity[]>({
    queryKey: ['master-purchase-order-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(masterPurchaseOrderAsyncThunks.getMasterPurchaseOrderList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return MasterPurchaseOrderMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const usePurchaseOrderYearListQuery = (args: { year: number }) => useQuery<PurchaseOrderYearEntity[]>({
    queryKey: ['purchase-order-year-list', { ...args }],    
    queryFn: async () => {
      try {
        const data = (await dispatch(masterPurchaseOrderAsyncThunks.getMasterPurchaseYearOrder(args))).payload;
        Validator.httpValidation(data as any);
        return MasterPurchaseOrderMapper.getPurchaseOrderYearList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useMasterPurchaseOrderQuery = (args: { masterPurchaseOrderId: number }) => useQuery<MasterPurchaseOrderEntity>({
    queryKey: ['master-purchase-order', { ...args }],    
    queryFn: async () => {
      try {
        const [errors, masterPurchaseOrderDto] = await MasterPurchaseOrderDTO.get({ ...args });
        if (errors) throw new Error(errors);
        const data = (await dispatch(masterPurchaseOrderAsyncThunks.getMasterPurchaseOrder(masterPurchaseOrderDto!))).payload;
        Validator.httpValidation(data as any);
        return MasterPurchaseOrderMapper.getItem(data);
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
    useMasterPurchaseOrderQuery,
    useMasterPurchaseOrderListQuery,
    usePurchaseOrderYearListQuery
  };
};

export default useMasterPurchaseOrder;