import { Module } from '@nestjs/common';
import { BearHashingService } from './bear-hashing.service';

@Module({
  providers: [BearHashingService],
  exports: [BearHashingService],
})
export class BearHashingModule {}
