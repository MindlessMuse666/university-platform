import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Введение в программирование',
    description: 'Название курса',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Базовый курс программирования для начинающих',
    description: 'Описание курса',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'introduction-to-programming',
    description: 'URL-совместимый идентификатор курса (slug)',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    example: 'https://drive.google.com/uc?export=view&id=1abc...',
    description: 'URL изображения курса (опционально)',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}