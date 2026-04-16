import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HabitsModule } from './module/habits/habits.module';
import { UserModule } from './module/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HabitsModule,
    UserModule
  ],
})
export class AppModule {}