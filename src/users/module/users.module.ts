import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../service/users.service';
import { UsersUtils } from '../utils/users.utils';
import { User } from '../../db/entity/users.entity';
import { UsersController } from '../controllers/users.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    UsersUtils,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
