import * as Yup from 'yup';

const schemaSIGNIN: Yup.ObjectSchema<SignInDTO> = Yup.object().shape({
  userName: Yup.string().required(),
  password: Yup.string().required(),
  isEcommerce: Yup.boolean().required()
});

const schemaSIGNUP: Yup.ObjectSchema<SignUpDTO> = Yup.object().shape({
  atributeAuth: Yup.string().required(),
  atributeValue: Yup.string().required(),
  password: Yup.string().required(),
  firtName: Yup.string().required(),
  lastName: Yup.string().required(),
  isEcommerce: Yup.boolean().required()
});

const schemaCONFIRM: Yup.ObjectSchema<ConfirmDTO> = Yup.object().shape({
  userName: Yup.string().required(),
  code: Yup.string().required(),
  isEcommerce: Yup.boolean().required()
});


export class SignInDTO {

  public userName?: string;

  public password?: string;

  public isEcommerce?: boolean;

  static async create(data: { [key: string]: any }): Promise<[any?, SignInDTO?]>
  {
    try {
      const dto = new SignInDTO();

      dto.userName = data.username;
      dto.password = data.password;
      dto.isEcommerce = data.isEcommerce;

      await schemaSIGNIN.validate(dto, { abortEarly: false });

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

export class SignUpDTO {

  public atributeAuth?: string;

  public atributeValue?: string;

  public password?: string;

  public firtName?: string;

  public lastName?: string;

  public isEcommerce?: boolean;

  static async create(data: { [key: string]: any }): Promise<[any?, SignUpDTO?]>
  {
    try {
      const dto = new SignUpDTO();

      dto.atributeAuth = data.atributeAuth;
      dto.atributeValue = data.atributeValue;
      dto.password = data.password;
      dto.firtName = data.firstName;
      dto.lastName = data.lastName;
      dto.isEcommerce = data.isEcommerce;

      await schemaSIGNUP.validate(dto, { abortEarly: false });

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

export class ConfirmDTO {

  public userName?: string;

  public code?: string;

  public isEcommerce?: boolean;

  static async create(data: { [key: string]: any }): Promise<[any?, ConfirmDTO?]>
  {
    try {
      const dto = new ConfirmDTO();

      dto.userName = data.username;
      dto.code = data.code;
      dto.isEcommerce = data.isEcommerce;

      await schemaCONFIRM.validate(dto, { abortEarly: false });

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