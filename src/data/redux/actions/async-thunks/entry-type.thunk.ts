import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { PaginationDTO, EntryTypeDTO } from '@wms/dtos';
import { WMSAPI } from '@wms/apis';
import { onRowCount, onGenerate } from '../../reducer/slices/entry-type.slice';


export const getEntryTypeList = createAsyncThunk(
  'catalogue/getEntryTypeList',
  async (paginationDto: PaginationDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onGenerate());
      const { data } = await WMSAPI.entryTypeListGET({ params: paginationDto });
      dispatch(onRowCount(data.count));
      return data.data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onSaveEntryType = createAsyncThunk(
  'catalogue/onSaveEntryType',
  async (entryTypeDto: EntryTypeDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createEntryTypePOST({ body: entryTypeDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onEditEntryType = createAsyncThunk(
  'catalogue/onEditEntryType',
  async (entryTypeDto: EntryTypeDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.updateEntryTypePUT({ body: entryTypeDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteEentryType = createAsyncThunk(
  'catalogue/onDeleteEentryType',
  async (entryTypeDto: EntryTypeDTO, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateEntryTypeDELETE({ body: entryTypeDto });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
