import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './source/utils/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const authGuard = app.get(AuthGuard);
  // app.useGlobalGuards(authGuard);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000, function () {
    console.log('Сервер ожидает подключения...');
  });
}
bootstrap();
