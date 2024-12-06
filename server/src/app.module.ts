import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { StudentModule } from './student/student.module';
import { FormTableModule } from './form-table/form-table.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule,
    AuthModule,
    PrismaModule,
    StudentModule,
    FormTableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
