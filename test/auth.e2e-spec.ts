import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

const userName = 'testingUser';
const userPassword = 'testPass0524';
const userEmail = 'testingUser@testing.test';
const userAvatar = 'data://base64';

describe('Auth', () => {
  let app: INestApplication;
  const authServiceValue = {
    cadastrar: () => {
      newUserId: String;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceValue)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /auth/cadastrar', () => {
    return request(app.getHttpServer())
      .post('/auth/cadastrar')
      .send({
        nome: userName,
        email: userEmail,
        senha: userPassword,
        avatar: userAvatar,
      })
      .expect(201)
      .expect({
        newUserId: String,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
