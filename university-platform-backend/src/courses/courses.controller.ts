import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
    Put,
    Query,
    ParseIntPipe,
  } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { Course } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard, JwtUser } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, User } from '@prisma/client';

interface RequestWithUser extends Request {
  user: JwtUser;
}

@ApiTags('courses')
@ApiBearerAuth('JWT-auth')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка курсов' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы (начиная с 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество курсов на странице',
  })
  @ApiResponse({
    status: 200,
    description: 'Список курсов успешно получен',
    schema: {
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Введение в программирование' },
              description: { type: 'string', example: 'Базовый курс программирования' },
              slug: { type: 'string', example: 'introduction-to-programming' },
              imageUrl: { type: 'string', example: 'https://drive.google.com/uc?export=view&id=1abc...' },
              published: { type: 'boolean', example: true },
              authorId: { type: 'number', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        total: { type: 'number', example: 10 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
        totalPages: { type: 'number', example: 1 },
      },
    },
  })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
  ) {
    return this.coursesService.findAll(page, limit);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Получение курса по slug' })
  @ApiResponse({
    status: 200,
    description: 'Курс успешно найден',
    schema: {
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Введение в программирование' },
        description: { type: 'string', example: 'Базовый курс программирования' },
        slug: { type: 'string', example: 'introduction-to-programming' },
        imageUrl: { type: 'string', example: 'https://drive.google.com/uc?export=view&id=1abc...' },
        published: { type: 'boolean', example: true },
        authorId: { type: 'number', example: 1 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Курс не найден' })
  async findOne(@Param('slug') slug: string) {
    return this.coursesService.findOne(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание нового курса' })
  @ApiResponse({
    status: 201,
    description: 'Курс успешно создан',
    schema: {
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Введение в программирование' },
        description: { type: 'string', example: 'Базовый курс программирования' },
        slug: { type: 'string', example: 'introduction-to-programming' },
        imageUrl: { type: 'string', example: 'https://drive.google.com/uc?export=view&id=1abc...' },
        published: { type: 'boolean', example: false },
        authorId: { type: 'number', example: 1 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Неверные данные для создания курса' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет прав для создания курса' })
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req: RequestWithUser) {
    return this.coursesService.create(createCourseDto, req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновление курса' })
  @ApiResponse({
    status: 200,
    description: 'Курс успешно обновлен',
    schema: {
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Введение в программирование' },
        description: { type: 'string', example: 'Базовый курс программирования' },
        slug: { type: 'string', example: 'introduction-to-programming' },
        imageUrl: { type: 'string', example: 'https://drive.google.com/uc?export=view&id=1abc...' },
        published: { type: 'boolean', example: true },
        authorId: { type: 'number', example: 1 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Неверные данные для обновления курса' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет прав для обновления курса' })
  @ApiResponse({ status: 404, description: 'Курс не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: CreateCourseDto,
    @Req() req: RequestWithUser,
  ) {
    return this.coursesService.update(id, updateCourseDto, { id: req.user.userId, role: req.user.role });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление курса' })
  @ApiResponse({ status: 200, description: 'Курс успешно удален' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Нет прав для удаления курса' })
  @ApiResponse({ status: 404, description: 'Курс не найден' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.coursesService.remove(id, { id: req.user.userId, role: req.user.role });
  }
}