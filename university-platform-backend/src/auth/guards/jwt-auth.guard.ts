import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';

export interface JwtUser {
  userId: number;
  email: string;
  role: UserRole;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = JwtUser>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err) {
      throw new UnauthorizedException('Token validation failed: ' + err.message);
    }
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    const jwtUser = user as unknown as JwtUser;
    if (!jwtUser.userId || !jwtUser.email || !jwtUser.role) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return user;
  }
}