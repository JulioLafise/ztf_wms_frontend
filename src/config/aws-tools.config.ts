import * as aws from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface IUploadS3 {
  file: any,
  fileName: string,
  folderName: string,
  contentType?: string
}

interface IGetObject {
  fileName: string,
  folderName: string,
}

interface IOptions {
  accessKeyId: string,
  secretAccessKey: string,
  region: string,
  bucket: string,
}

export class AWSTools {
  private s3!: aws.S3Client;

  constructor(
    private options: IOptions
  ) { }

  private initS3() {
    this.s3 = new aws.S3Client({
      region: this.options.region,
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey
      }
    });
  }

  public async uploadPDF({ file, fileName, folderName }: IUploadS3): Promise<void | aws.PutObjectCommandOutput> {
    try {
      this.initS3();
      const name: string = `${folderName}/${fileName}.pdf`;
      const params = new aws.PutObjectCommand({
        Key: name,
        Body: file,
        ContentEncoding: 'base64',
        ContentType: 'application/pdf',
        Bucket: this.options.bucket
      });
      return await this.s3.send(params);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async uploadImage({ file, fileName, folderName, contentType }: IUploadS3): Promise<void | aws.PutObjectCommandOutput> {
    try {
      this.initS3();
      const name: string = `${folderName}/${fileName}`;
      const params = new aws.PutObjectCommand({
        Key: name,
        Body: file,
        // ContentEncoding: 'base64',
        ContentType: contentType,
        Bucket: this.options.bucket
      });
      return await this.s3.send(params);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getObjectUrl({ fileName, folderName }: IGetObject) {
    try {
      this.initS3();
      const name: string = `${folderName}/${fileName}`;
      const params = new aws.GetObjectCommand({
        Key: name,
        Bucket: this.options.bucket,
      });
      return await getSignedUrl(this.s3, params);
      // return await this.s3.send(params);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}