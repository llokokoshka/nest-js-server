import { Body, Controller, Global, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/lib/loginUser.dto';
import { CreateUserDto } from 'src/users/lib/createUsers.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  @Post('sign-up')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() rt) {
    return this.authService.refreshToken(rt.refresh_token);
  }
}
