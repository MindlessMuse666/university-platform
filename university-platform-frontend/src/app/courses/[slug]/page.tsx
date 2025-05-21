'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCourseBySlug } from '@/lib/api/courses';
import { IMAGES } from '@/constants/global.constants';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => getCourseBySlug(slug as string),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              {/* Заголовок */}
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              
              {/* Изображение */}
              <div className="aspect-square bg-gray-200 rounded-lg" />
              
              {/* Контент */}
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Курс не найден
            </h2>
            <p className="text-gray-600 mb-6">
              Запрашиваемый курс не существует или был удален.
            </p>
            <button
              onClick={() => router.push('/courses')}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Вернуться к курсам
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Фиксированный хедер */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/courses"
              className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Назад к курсам
            </Link>
            <button
              onClick={() => {/* TODO: Добавить функционал записи на курс */}}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Записаться на курс
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Основной контент */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Изображение курса */}
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
                <Image
                  src={course.imageUrl || IMAGES.COURSES.DEFAULT}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Информация о курсе */}
              <div className="p-6 md:p-8 flex flex-col">
                {/* Заголовок и метаданные */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {course.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 items-center">
                    {course.instructor && (
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {course.instructor}
                      </div>
                    )}
                    {course.level && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
                        {course.level}
                      </span>
                    )}
                    {course.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                        {course.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Описание курса */}
                <div className="prose prose-lg max-w-none mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    О курсе
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Дополнительная информация */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Детали курса
                    </h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Категория
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {course.category || 'Не указана'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Язык
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {course.language || 'Русский'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Уровень
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {course.level || 'Не указан'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Статус
                    </h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Состояние
                        </dt>
                        <dd className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Активный
                          </span>
                        </dd>
                      </div>
                      {course.createdAt && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Дата создания
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {new Date(course.createdAt).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </dd>
                        </div>
                      )}
                      {course.updatedAt && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Последнее обновление
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {new Date(course.updatedAt).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* Кнопка записи на курс (для мобильных устройств) */}
                <div className="mt-auto md:hidden">
                  <button
                    type="button"
                    className="w-full px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    Записаться на курс
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 