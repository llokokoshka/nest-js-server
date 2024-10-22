import { Length } from 'class-validator';

export class UpdateUserDto {

  fullName?: string;

  @Length(6, 24)
  password?: string;

  Dob?: Date;
}
