import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './source/utils/http-exception.filter';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import {dbConfig} from './db/dataSource';
import { UserRepository } from './users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UserRepository
  ],
})
export class AppModule {}
