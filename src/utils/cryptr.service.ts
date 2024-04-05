import { Injectable } from '@nestjs/common';
import cryptr from 'cryptr';

const SECRET_KEY = process.env.SECRET_KEY || '';

// type IEncodingProps = 'base64' | 'latin1' | 'hex';
type TMode = 'encrypt' | 'decrypt';

@Injectable()
export class CryptrService {
  constructor() {}
  transformData(data: Record<string, string>, mode: TMode): object {
    const crypdec = new cryptr(SECRET_KEY, {
      encoding: 'latin1',
      pbkdf2Iterations: 75000,
      saltLength: 48,
    });
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);
    const newData: object = {};
    for (let i = 0; i < dataKeys.length; i++) {
      const key = dataKeys[i];
      if (mode === 'encrypt') {
        console.log(`Encrypting ${key}: ${dataValues[i]}`);
        const encryptedValue = crypdec.encrypt(String(dataValues[i]));
        console.log('Done!');
        newData[key] = encryptedValue;
      } else if (mode === 'decrypt') {
        console.log(`Decrypting ${key}: ${dataValues[i]}`);
        const decryptedValue = crypdec.decrypt(String(dataValues[i]));
        console.log('Done!');
        newData[key] = decryptedValue;
      }
    }
    return newData;
  }
}
