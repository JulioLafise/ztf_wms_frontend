

export class UserEntity {
  public constructor(
    public userId?: string,
    public email?: string,
    public username?: string,
    public picture?: string,
    public firstName?: string,
    public lastName?: string,
    public identificationCard?: string,
    public address?: string,
    public phone?: string,
    public accountStatus?: string,
    public rolGroup?: string,
    public createdAt?: Date,
    public isVerified?: boolean,
    public isActive?: boolean,
  ) {}
}