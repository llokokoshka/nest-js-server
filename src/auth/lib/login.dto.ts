import { IsNotEmpty } from 'class-validator';
import { VisibleUserParamsDto } from 'src/users/lib/visibleUserParams.dto';

export class LoginDto {
  @IsNotEmpty()
  user: VisibleUserParamsDto;

  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  refresh_token: string;
}
