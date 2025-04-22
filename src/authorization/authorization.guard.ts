import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthorizaitonGuard implements CanActivate {
  constructor(private readonly jwt: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')?.[1]
    if (!token) {
      throw new UnauthorizedException('Token not found')
    }
    try {
      const data = this.jwt.verify(token)
      request['user-id'] = data.id
      request['user-role'] = data.role
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token valid error')
    }
  }
}