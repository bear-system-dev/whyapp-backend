import { Injectable } from '@nestjs/common';
import cryptr from 'cryptr';

const SECRET_KEY = process.env.SECRET_KEY || '';

// type IEncodingProps = 'base64' | 'latin1' | 'hex';
type TMode = 'encrypt' | 'decrypt';

@Injectable()
export class CryptrService {
  constructor() {}
  transformData(
    data: Record<string, string>,
    mode: TMode,
  ): Record<string, string> {
    const crypdec = new cryptr(SECRET_KEY, {
      encoding: 'latin1',
      pbkdf2Iterations: 75000,
      saltLength: 48,
    });
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];
    let newValue = value;
    newValue = crypdec.encrypt(value);
    if (mode === 'decrypt') {
      newValue = crypdec.decrypt(value);
    }
    return { [key]: newValue };
  }
}
