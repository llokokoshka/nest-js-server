import { Body, Controller, Global, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/lib/loginUser.dto';
import { CreateUserDto } from 'src/users/lib/createUsers.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  login(@Body() loginUserDto: LoginUserDto, @Req() req) {
    return this.authService.login(loginUserDto.email, loginUserDto.password, req);
  }

  @Post('sign-up')
  registration(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.authService.registration(createUserDto, req);
  }

  @Post('refresh-token')
  refreshToken(@Body() rt:{refresh_token:string}){
    const{ refresh_token } = rt;
    console.log(refresh_token);
    return this.authService.refreshToken(refresh_token);
  }
}
