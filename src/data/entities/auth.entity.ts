

export class SingInEntity {
  constructor(
    public accessToken?: string,
    public idToken?: string,
    public refreshToken?: string,
    public newDeviceMetadata?: any,
    public tokenType?: string,
    public expiresIn?: number 
  ) {}
}