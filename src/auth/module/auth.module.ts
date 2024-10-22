import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/source/utils/http-exception.filter';
import * as dotenv from 'dotenv';
import { UserRepository } from 'src/users/users.repository';

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
    UserRepository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
