import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/is-public-endpoint.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private errors: Array<object> = []; //test
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    this.errors.push({ token }); //test

    if (!token) {
      throw new UnauthorizedException({
        message: 'Token não existe',
        errors: this.errors,
      });
    }
    const isBlackListedToken = await this.authService.isBlackListedToken({
      token: `Bearer ${token}`,
    });
    if (isBlackListedToken instanceof Error)
      throw new UnauthorizedException(isBlackListedToken.message);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Erro na validação do token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    this.errors.push({ extract: { type, token, headers: request.headers } }); //test
    return type === 'Bearer' ? token : undefined;
  }
}
