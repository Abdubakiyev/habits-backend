import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HabitsModule } from './module/habits/habits.module';
import { UserModule } from './module/user/user.module';
import { AppController } from './app.controller';   // ← qo'shing
import { AppService } from './app.service';           // ← qo'shing

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HabitsModule,
    UserModule,
  ],
  controllers: [AppController],   // ← qo'shing
  providers: [AppService],         // ← qo'shing
})
export class AppModule {}