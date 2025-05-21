import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Университетская платформа
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Современная платформа для управления учебным процессом. Изучайте курсы, общайтесь с преподавателями
              и следите за своим прогрессом.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/courses"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Начать обучение
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Узнать больше <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Быстрый старт</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Все, что вам нужно для обучения
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Наша платформа предоставляет все необходимые инструменты для эффективного обучения и преподавания.
            </p>
          </div>
        </div>
    </div>
    </>
  );
}
