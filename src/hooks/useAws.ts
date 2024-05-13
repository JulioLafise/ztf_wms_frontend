import React from 'react';
import { AWSTools, enviroment } from '@wms/config';

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

  return {
    s3Upload,
    s3GetObject,
    isLoading
  };
};

export default useAws;