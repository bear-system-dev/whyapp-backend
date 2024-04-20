import { Injectable } from '@nestjs/common';
import { chars } from './utils';
@Injectable()
export class BearHashingService {
  constructor() {}
  public transform(data: string): string {
    const splData = data.split('');
    let hash: string = '';
    splData.forEach((char) => {
      Object.keys(chars).forEach((key) => {
        if (key === char) {
          hash += chars[key];
        }
      });
    });
    console.log(hash);
    return hash;
  }
}
