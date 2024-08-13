import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { departureTypeAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { DepartureTypeEntity } from '@wms/entities';
import { PaginationDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { DepartureTypeMapper } from '@wms/mappers';


const useDepartureType = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.entryTypeReducer);

  const useDepartureTypeListQuery = (pagination: IPagination) => useQuery<DepartureTypeEntity[]>({
    queryKey: ['departure-type-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(departureTypeAsyncThunks.getDepartureTypeList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return DepartureTypeMapper.getList(data);
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
    useDepartureTypeListQuery
  };
};

export default useDepartureType;