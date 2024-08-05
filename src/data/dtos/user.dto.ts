import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<UsersDTO> = Yup.object().shape({
  sub: Yup.string().notRequired(),
  userName: Yup.string().notRequired(),
  atributeAuth: Yup.string<TypeAuth>().required(),
  atributeValue: Yup.string().required(),
  firtName: Yup.string().required(),
  lastName: Yup.string().required(),
  password: Yup.string().required(),
  cedula: Yup.string().notRequired(),
  picture: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  phone: Yup.string().notRequired(),
  isEcommerce: Yup.boolean().required()
});

const schemaPATCH: Yup.ObjectSchema<UsersDTO> = Yup.object().shape({
  sub: Yup.string().notRequired(),
  userName: Yup.string().required(),
  atributeAuth: Yup.string<TypeAuth>().notRequired(),
  atributeValue: Yup.string().notRequired(),
  firtName: Yup.string().notRequired(),
  lastName: Yup.string().notRequired(),
  password: Yup.string().notRequired(),
  cedula: Yup.string().notRequired(),
  picture: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  phone: Yup.string().notRequired(),
  isEcommerce: Yup.boolean().notRequired()
});

const schemaGET: Yup.ObjectSchema<UsersDTO> = Yup.object().shape({
  sub: Yup.string().required(),
  userName: Yup.string().notRequired(),
  atributeAuth: Yup.string<TypeAuth>().notRequired(),
  atributeValue: Yup.string().notRequired(),
  firtName: Yup.string().notRequired(),
  lastName: Yup.string().notRequired(),
  password: Yup.string().notRequired(),
  cedula: Yup.string().notRequired(),
  picture: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  phone: Yup.string().notRequired(),
  isEcommerce: Yup.boolean().notRequired()
});

type TypeAuth = 'email';

export class UsersDTO {

  public sub?: string;

  public userName?: string;

  public atributeAuth?: TypeAuth;

  public atributeValue?: string;

  public password?: string;

  public firtName?: string;

  public lastName?: string;

  public cedula?: string;

  public picture?: string;

  public address?: string;

  public phone?: string;

  public isEcommerce?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, UsersDTO?]>
  {
    try {
      const dto = new UsersDTO();

      dto.atributeAuth = 'email';
      dto.atributeValue= data.email;
      dto.password = data.password;
      dto.firtName = data.firstName;
      dto.lastName = data.lastName;
      dto.isEcommerce = false;

      await schemaPOST.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error();
    }
  }

  static async updated(data: { [key: string]: any }): Promise<[any?, UsersDTO?]>
  {
    try {
      const dto = new UsersDTO();

      dto.userName = data.username;
      dto.firtName = data.firstName;
      dto.lastName = data.lastName;
      dto.cedula = data.identificationCard;
      dto.picture = data.picture;
      dto.address = data.address;
      dto.phone = data.phone;

      await schemaPATCH.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error();
    }
  }
  
  static async get(data: { [key: string]: any }): Promise<[any?, UsersDTO?]>
  {
    try {
      const dto = new UsersDTO();

      dto.sub = data.userId;

      await schemaGET.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error();
    }
  }

}