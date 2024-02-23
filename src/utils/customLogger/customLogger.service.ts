import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomLogger {
  private readonly logger = new Logger(CustomLogger.name);
  public log(msg: string | object) {
    this.logger.log(msg);
  }
}
