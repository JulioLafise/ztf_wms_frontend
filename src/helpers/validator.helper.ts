import * as Yup from 'yup';
import { ErrorAxios } from '@wms/interfaces';

interface IYupSchemaValidation<T extends Yup.Maybe<Yup.AnyObject>> {
  schema: Yup.ObjectSchema<T, Yup.AnyObject, any, ''>,
  data: { [x: string]: any }
}

type TypeResult<T> = { [x in keyof T]: any; } | object;

export class Validator {

  static async yupSchemaValidation<T extends Yup.Maybe<Yup.AnyObject>,>({ schema, data }: IYupSchemaValidation<T>): Promise<[boolean, TypeResult<T>]> {
    try {
      const result = await schema.validate(data, { abortEarly: false });
      return [true, result];   
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        let objErrors: TypeResult<T> = {};
        error.inner.forEach(msg => {
          objErrors = {
            ...objErrors,
            [msg.path!]: msg.message
          };
        });
        return [false, objErrors];
      }
      return [false, { error }];
    }
  }

  static isObjectEmpty(objectName?: object) {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  }

  static httpValidation(response: ErrorAxios, fields?: Array<{ [key: string]: any }>) {
    let error = undefined;
    if (!response) {
      throw new Error('Connection error');
    }
    const infoError: Record<string,any> = response.message as any;
    if (response.statusCode === 400) {
      switch (typeof infoError.messageError) {
        case 'object':
          error = JSON.stringify(infoError.messageError);
          break;

        case 'string':
          error = infoError.messageError;
          break;

        default:
          error = JSON.stringify(infoError.messageError);
          break;
      }      
    }
    if (response.statusCode === 500) {
      error = response.statusText;
    }
    if (response.statusCode === 401) {
      error = response.message.message || 'Expired session';
    }
    if (response.statusCode === 404) {
      error = 'Datasource not found';
    }
    if (response.statusCode === 409) {
      error = 'Duplicate key value';
    }
    if (error) throw new Error(error);
  }

}