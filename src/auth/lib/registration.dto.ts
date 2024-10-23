import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entity/users.entity';

export class RegistrationDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  refresh_token: string;
}
