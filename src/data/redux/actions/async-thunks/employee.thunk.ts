import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, EmployeeDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/employee.slice';


export const getEmployeeList = createAsyncThunk(
  'catalogue/getEmployeeList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.employeeListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveEmployee = createAsyncThunk(
  'catalogue/onSaveEmployee',
  async (employeeDto: EmployeeDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createEmployeePOST({ body: employeeDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditEmployee = createAsyncThunk(
  'catalogue/onEditEmployee',
  async (employeeDto: EmployeeDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateEmployeePUT({ body: employeeDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteEmployee = createAsyncThunk(
  'catalogue/onDeleteEmployee',
  async (employeeDto: EmployeeDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateEmployeeDELETE({ body: employeeDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
