import { Body, Controller, Global, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/lib/loginUser.dto';
import { CreateUserDto } from 'src/users/lib/createUsers.dto';
import { RefreshTokenDto } from './lib/refreshToken.dto';
import { Public } from './decorators/guard.decorator';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  @Public()
  @Post('sign-up')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Public()
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }
}
