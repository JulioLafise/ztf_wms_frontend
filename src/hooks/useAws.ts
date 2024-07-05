import React from 'react';
import { AWSTools, enviroment } from '@wms/config';
import { getUUIDFromURL, Validator } from '@wms/helpers';
import { awsAsyncThunks } from '@wms/redux/actions';
import { useAppDispatch } from '@wms/redux/selector';
import { ImageS3Api } from '@wms/interfaces';

interface IUploadAws {
  file: any,
  fileName: string,
  folderName: string,
  contentType?: string,
  type: 'image' | 'pdf'
}

interface IGetObjectAws {
  fileName: string,
  folderName: string,
}

const useAws = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const dispatch = useAppDispatch();

  const s3Upload = async (options: IUploadAws) => {
    try {
      setIsLoading(true);
      const s3 = new AWSTools({
        accessKeyId: enviroment.accessKeyId,
        secretAccessKey: enviroment.secretAccessKey,
        region: enviroment.region,
        bucket: 'imagen'
      });
      if (options.type === 'image') {
        const response = await s3.uploadImage({
          file: options.file,
          fileName: options.fileName,
          folderName: options.folderName,
          contentType: options.contentType
        });
        setIsLoading(false);
        return response;
      }
      if (options.type === 'pdf') {
        const response = await s3.uploadPDF({
          file: options.file,
          fileName: options.fileName,
          folderName: options.folderName
        });
        setIsLoading(false);
        return response;
      }
      setIsLoading(false);
      return Promise.resolve(undefined);
    } catch (error) {
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const s3GetObject = async (options: IGetObjectAws) => {
    try {
      setIsLoading(true);
      const s3 = new AWSTools({
        accessKeyId: enviroment.accessKeyId,
        secretAccessKey: enviroment.secretAccessKey,
        region: enviroment.region,
        bucket: 'imagen'
      });
      const objUrl = await s3.getObjectUrl({
        fileName: options.fileName,
        folderName: options.folderName,
      });
      setIsLoading(false);
      return objUrl;
    } catch (error) {
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const uploadImageToS3Api = async (images: File[]): Promise<string[]> => {
    setIsLoading(true);
    const data = (await dispatch(awsAsyncThunks.onSaveImageToS3({ images }))).payload as string[];
    Validator.httpValidation(data as any);
    setIsLoading(false);
    return data;
  };

  const deleteImageFromS3Api = async (args: { value: string, type: 'url' | 'uuid' }): Promise<boolean> => {
    const { type = 'uuid', value } = args;
    try {
      const data = (await dispatch(awsAsyncThunks.onDeleteImageFromS3({ id: type === 'url' ? getUUIDFromURL(value) : value }))).payload as ImageS3Api;
      Validator.httpValidation(data as any);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(false);
    }
  };

  return {
    s3Upload,
    s3GetObject,
    uploadImageToS3Api,
    deleteImageFromS3Api,
    isLoading
  };
};

export default useAws;