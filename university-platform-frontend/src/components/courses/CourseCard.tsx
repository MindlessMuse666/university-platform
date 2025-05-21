'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/types/course';
import { IMAGES } from '@/constants/global.constants';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link 
      href={`/courses/${course.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 max-w-sm mx-auto"
    >
      {/* Квадратное изображение с эффектом при наведении */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={course.imageUrl || IMAGES.COURSES.DEFAULT}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Градиентный оверлей */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Контент карточки */}
      <div className="p-4">
        <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {course.description}
        </p>

        {/* Метаданные курса */}
        <div className="flex items-center justify-between text-sm">
          {course.instructor && (
            <span className="text-gray-500 flex items-center text-xs">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {course.instructor}
            </span>
          )}
          {course.level && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
              {course.level}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
} 