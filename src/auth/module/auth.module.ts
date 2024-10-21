import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersModule } from '../../users/module/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import * as dotenv from 'dotenv';
import { UsersUtils } from 'src/users/utils/users.utils';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    UsersUtils,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
