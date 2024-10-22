import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/source/utils/http-exception.filter';
import * as dotenv from 'dotenv';
import { UserRepository } from 'src/users/users.repository';
import { CreateTokensUtil } from './utils/token.utils';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService,
    UserRepository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    CreateTokensUtil
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
