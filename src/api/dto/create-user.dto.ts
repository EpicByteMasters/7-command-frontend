interface ICreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

class CreateUserDto implements ICreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(payload: ICreateUserDto) {
    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;
  }
}

export type { ICreateUserDto };

export default CreateUserDto;
