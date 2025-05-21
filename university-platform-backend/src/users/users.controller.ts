import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { User } from '@prisma/client';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | null> {
      return this.usersService.findOne(+id);
    }
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.createUser(createUserDto);
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return this.usersService.updateUser(+id, updateUserDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
      return this.usersService.deleteUser(+id);
    }
  }