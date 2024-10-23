import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './db/dataSource';
import { UserRepository } from './users/users.repository';
import { AuthGuard } from './auth/auth.guard';
import configuration from './config/configuration';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UserRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
