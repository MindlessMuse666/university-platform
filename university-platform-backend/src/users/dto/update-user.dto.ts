export class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
  }