import { UserEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class UserMapper {
  constructor() {}

  static getItem(values: unknown): UserEntity {
    let data: UserEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      const attr = this.getUserAttributes(value.userAttributes);
      data =  {
        userId: attr.sub,
        email: attr.email,
        username: value.username,
        rolGroup: attr.website,
        address: attr.address,
        firstName: attr.firstName,
        lastName: attr.lastName,
        identificationCard: attr.cedula,
        phone: attr.phone,
        picture: attr.picture,
        accountStatus: value.userStatus,
        createdAt: value.userCreateDate,
        isVerified: attr.email_verified,
        isActive: value.enable
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): UserEntity[] {
    let data: UserEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        const attr = this.getUserAttributes(value.userAttributes);
        data = [
          ...data,
          {
            userId: attr.sub,
            email: attr.email,
            username: value.username,
            rolGroup: attr.website,
            address: attr.address,
            firstName: attr.firstName,
            lastName: attr.lastName,
            identificationCard: attr.cedula,
            phone: attr.phone,
            picture: attr.picture,
            accountStatus: value.userStatus,
            createdAt: value.userCreateDate,
            isVerified: attr.email_verified,
            isActive: value.enable
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

  private static getUserAttributes(values: unknown) {
    let data: any = null;
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = {
          ...data,
          [item.name]: item.value
        };
      });
    } else throw new Error('An array was expected');
    return data;
  }

}