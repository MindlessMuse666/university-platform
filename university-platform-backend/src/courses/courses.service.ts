import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course, UserRole } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';

interface AuthUser {
  id: number;
  role: UserRole;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.course.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.course.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (!course) {
      throw new NotFoundException(`Курс со slug ${slug} не найден`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto, authorId: number) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        authorId,
        published: false,
      },
    });
  }

  async update(id: number, updateCourseDto: CreateCourseDto, user: AuthUser) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Курс с ID ${id} не найден`);
    }

    if (course.authorId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('У вас нет прав для обновления этого курса');
    }

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: number, user: AuthUser) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Курс с ID ${id} не найден`);
    }

    if (course.authorId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('У вас нет прав для удаления этого курса');
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}