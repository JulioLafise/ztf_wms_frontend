import { useQuery } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { countryAsyncThunks } from '@wms/redux/actions';
import { IPagination } from '@wms/interfaces';
import { CountryEntity, DepartamentEntity } from '@wms/entities';
import { PaginationDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { CountryMapper } from '@wms/mappers';


const useCountry = () => {
  const dispatch = useAppDispatch();

  const { data, selected, isGenerate, rowCount } = useAppSelector(state => state.countryReducer);

  const useCountryListQuery = (pagination: IPagination) => useQuery<CountryEntity[]>({
    queryKey: ['countries-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(countryAsyncThunks.getCountryList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return CountryMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useCountryQuery = (args: { countryId: number }) => useQuery<CountryEntity>({
    queryKey: ['country', { ...args }],    
    queryFn: async () => {
      try {
        if (args.countryId === undefined) return null;
        const data = (await dispatch(countryAsyncThunks.getCountry(args))).payload;
        Validator.httpValidation(data as any);
        return CountryMapper.getItem(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useDepartamentQuery = (args: { countryId: number }) => useQuery<DepartamentEntity[]>({
    queryKey: ['departament-list', { ...args }],    
    queryFn: async () => {
      try {
        if (args.countryId === undefined) return null;
        const data = (await dispatch(countryAsyncThunks.getCountry(args))).payload;
        Validator.httpValidation(data as any);
        return CountryMapper.getDepartamentList(data);
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
    selected,
    isGenerate,
    rowCount,
    //METHODS
    useCountryListQuery,
    useDepartamentQuery,
    useCountryQuery,
  };
};

export default useCountry;