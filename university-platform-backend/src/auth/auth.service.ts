import {
    Injectable,
    UnauthorizedException,
    ConflictException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { UsersService } from '../users/users.service';
  import { User } from '@prisma/client';
  import * as bcrypt from 'bcrypt';
  import { LoginDto } from './dto/login.dto';
  import { RegisterDto } from './dto/register.dto';
  

  @Injectable()
  export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}
  
    async validateUser(email: string, pass: string): Promise<Omit<User, 'password'>> {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const { password, ...result } = user;
      return result;
    }
  
    async login(loginDto: LoginDto) {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }
    
    async register(registerDto: RegisterDto) {
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    
      const user = await this.usersService.createUser({
        ...registerDto,
        role: 'TEACHER',
      });
      const { password, ...result } = user;
      return result;
    }
  }