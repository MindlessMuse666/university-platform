import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUrl, MinLength, MaxLength } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({
    example: 'Обновленный курс',
    description: 'Название курса',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    example: 'Обновленное описание курса',
    description: 'Подробное описание курса',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    example: 'updated-course',
    description: 'Уникальный URL-идентификатор курса',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  slug?: string;

  @ApiProperty({
    example: 'https://example.com/updated-image.jpg',
    description: 'URL изображения курса',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Статус публикации курса',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}