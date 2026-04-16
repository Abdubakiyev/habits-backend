import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ========== GLOBAL VALIDATION PIPE ==========
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO’da bo‘lmagan maydonlarni olib tashlaydi
      forbidNonWhitelisted: true, // Qo‘shimcha maydon bo‘lsa error beradi
      transform: true, // Param va body’larni DTO tipiga o‘zgartiradi
    }),
  );

  // ========== CORS ==========
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ========== GLOBAL PREFIX ==========
  app.setGlobalPrefix('api');

  // ========== SWAGGER ==========
  const config = new DocumentBuilder()
    .setTitle('Habits Tracker API')
    .setDescription('Odatlar va Hafta kuzatuvchi API dokumentatsiyasi')
    .setVersion('1.0')
    .addTag('habits')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // http://localhost:3000/api/docs

  // ========== SERVER ==========
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}/api`);
  console.log(`📖 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();