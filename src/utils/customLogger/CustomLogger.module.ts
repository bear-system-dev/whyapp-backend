import { Module } from '@nestjs/common';
import { CustomLogger } from './customLogger.service';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
