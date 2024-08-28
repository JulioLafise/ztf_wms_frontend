import { AccountStatusEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';
import moment from 'moment';

export class MasterAccount {

  static getAccountStatusList(values: unknown): AccountStatusEntity[] {
    let data: AccountStatusEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            month: item.year,
            status: item.descripcion,
            count: item.count,
            amount: item.sum
          }
        ];
      });
    } 
    return data;
  }

}