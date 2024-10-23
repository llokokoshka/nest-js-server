import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class VisibleUserParamsDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  Dob: Date;
}
