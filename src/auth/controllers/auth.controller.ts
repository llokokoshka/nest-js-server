import {
  Body,
  Controller,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { CreateUserDto } from 'src/users/dto/createUsers.dto';

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
}
