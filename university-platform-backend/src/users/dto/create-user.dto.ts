export class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
  }