import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { CustomLoggerModule } from 'src/utils/customLogger/CustomLogger.module';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '10m';

@Module({
  imports: [
    UsersModule,
    CustomLoggerModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
