import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { WMSAPI } from '@wms/apis';


export const onSaveImageToS3 = createAsyncThunk(
  'aws/onSaveImageToS3',
  async (args: { images: File[] }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.createImageToS3POST({ body: args });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const onDeleteImageFromS3 = createAsyncThunk(
  'aws/onDeleteImageFromS3',
  async (args: { id: string } , { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.eliminateImageFromS3DELETE({ params: { imageId: args.id } });
      return data;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
