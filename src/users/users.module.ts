import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { User } from './entity/users.entity';
import { UsersController } from './users.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/source/utils/http-exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    UserRepository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}