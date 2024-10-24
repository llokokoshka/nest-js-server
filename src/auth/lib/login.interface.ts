import { VisibleUserParamsDto } from 'src/users/lib/visibleUserParams.interface';

export interface ILogin {
  user: VisibleUserParamsDto;
  access_token: string;
  refresh_token: string;
}
