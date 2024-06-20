import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { employeeAsyncThunks } from '@wms/redux/actions';
import { IPagination, IOptionsQuery } from '@wms/interfaces';
import { EmployeeEntity } from '@wms/entities';
import { PaginationDTO, EmployeeDTO } from '@wms/dtos';
import { Validator } from '@wms/helpers';
import { EmployeeMapper } from '@wms/mappers';


const useEmployee = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isGenerate, rowCount } = useAppSelector(state => state.employeeReducer);

  const useEmployeeQuery = (pagination: IPagination) => useQuery<EmployeeEntity[]>({
    queryKey: ['employee-list', { ...pagination }],    
    queryFn: async () => {
      try {
        const [errors, paginationDto] = await PaginationDTO.created({ ...pagination });
        if (errors) throw new Error(errors);
        const data = (await dispatch(employeeAsyncThunks.getEmployeeList(paginationDto!))).payload;
        Validator.httpValidation(data as any);
        return EmployeeMapper.getList(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 60
  });

  const useEmployeeMutation = (pagination?: IPagination, options?: IOptionsQuery) => useMutation<EmployeeEntity, Error, EmployeeEntity>({
    mutationFn: async (data) => { 
      if (options?.typeMutation === 'post') {
        const [errors, employeeDto] = await EmployeeDTO.created({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(employeeAsyncThunks.onSaveEmployee(employeeDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return EmployeeMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'put') {
        const [errors, employeeDto] = await EmployeeDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(employeeAsyncThunks.onEditEmployee(employeeDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return EmployeeMapper.getItem(dataNew);
      }
      if (options?.typeMutation === 'delete') {
        const [errors, employeeDto] = await EmployeeDTO.updated({ ...data });
        if (errors) throw new Error(errors);
        const dataNew = (await dispatch(employeeAsyncThunks.onDeleteEmployee(employeeDto!))).payload;
        Validator.httpValidation(dataNew as any);
        return data;
      }
      return data;
    },
    onSuccess: (data) => {
      pagination && queryClient.invalidateQueries({
        queryKey: ['employee-list', { ...pagination }]
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
    useEmployeeQuery,
    useEmployeeMutation
  };
};

export default useEmployee;