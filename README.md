# University Platform

Современная университетская платформа для управления учебным процессом, разработанная с использованием актуального стека технологий. Платформа предоставляет удобный интерфейс для студентов и преподавателей, позволяя эффективно управлять курсами, материалами и процессом обучения.

## 🚀 Технологии

### Backend
- [NestJS](https://nestjs.com/) - Прогрессивный Node.js фреймворк для создания масштабируемых серверных приложений
- [PostgreSQL](https://www.postgresql.org/) - Надежная реляционная база данных
- [Prisma](https://www.prisma.io/) - Современный ORM с типобезопасностью
- [JWT](https://jwt.io/) - Безопасная аутентификация и авторизация
- [TypeScript](https://www.typescriptlang.org/) - Типизированный JavaScript для надежной разработки
- [Swagger](https://swagger.io/) - Автоматическая документация API

### Frontend
- [Next.js 14](https://nextjs.org/) - React фреймворк с серверными компонентами
- [TypeScript](https://www.typescriptlang.org/) - Типизированный JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS фреймворк для быстрой разработки UI
- [React Query](https://tanstack.com/query/latest) - Управление состоянием и кэширование данных
- [Axios](https://axios-http.com/) - HTTP клиент с перехватчиками запросов

## 📋 Требования

- Node.js 18.x или выше
- PostgreSQL 14.x или выше
- npm 9.x или выше

## 🛠 Установка и запуск

### Клонирование репозитория
```bash
git clone https://github.com/MindlessMuse666/university-platform.git
cd university-platform
```

### Backend
```bash
cd university-platform-backend

# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env
# Отредактируйте .env файл, указав необходимые параметры

# Применение миграций базы данных
npx prisma migrate dev

# Запуск в режиме разработки
npm run start:dev

# Запуск в production режиме
npm run build
npm run start:prod
```

### Frontend
```bash
cd university-platform-frontend

# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env
# Отредактируйте .env файл, указав URL бэкенда (NEXT_PUBLIC_API_URL)

# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build
npm run start
```

## 🌐 Доступ к приложению

После запуска приложение будет доступно по следующим адресам:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Документация: http://localhost:3001/docs (Swagger UI)

## ✨ Основные функции

### Курсы
- Просмотр списка доступных курсов
- Детальная информация о курсе
- Поиск и фильтрация курсов по уровню и категории
- Современный адаптивный интерфейс
- Поддержка изображений курсов

### Пользователи
- Система ролей (Студент, Преподаватель, Администратор)
- Аутентификация и авторизация
- Управление профилем пользователя

### Контент
- Загрузка и отображение изображений
- Структурированный контент курсов
- Поддержка различных форматов материалов

## 🏗 Структура проекта

```
university-platform/
├── university-platform-backend/     # Backend приложение (NestJS)
│   ├── src/
│   │   ├── auth/                   # Аутентификация и авторизация
│   │   ├── courses/                # Модуль курсов
│   │   ├── users/                  # Управление пользователями
│   │   └── common/                 # Общие утилиты и middleware
│   ├── prisma/                     # Схема базы данных и миграции
│   └── test/                       # Тесты
│
└── university-platform-frontend/    # Frontend приложение (Next.js)
    ├── src/
    │   ├── app/                    # Страницы приложения (App Router)
    │   │   ├── courses/           # Страницы курсов
    │   │   └── auth/              # Страницы аутентификации
    │   ├── components/            # React компоненты
    │   │   ├── courses/          # Компоненты для курсов
    │   │   └── ui/               # UI компоненты
    │   ├── lib/                  # Утилиты и хелперы
    │   │   ├── api/             # API клиент и методы
    │   │   └── utils/           # Общие утилиты
    │   ├── types/               # TypeScript типы
    │   └── constants/           # Глобальные константы
    └── public/                  # Статические файлы
```

## 🎯 Текущий статус

### Реализовано
- ✅ Базовая структура проекта
- ✅ API для курсов
- ✅ Интерфейс списка курсов
- ✅ Детальный просмотр курса
- ✅ Поиск и фильтрация курсов
- ✅ Адаптивный дизайн

### В разработке
- 🔄 Система аутентификации
- 🔄 Управление пользователями
- 🔄 Загрузка материалов курсов
- 🔄 Система прогресса обучения

## 📸 Скриншоты

### Главная страница
![Главная страница](https://github.com/user-attachments/assets/0bad122b-f77f-43e7-9ce9-f0185fcf1db2)
*Современный и чистый интерфейс главной страницы*

### Список курсов
![Список курсов](https://github.com/user-attachments/assets/491f916b-93cf-41c9-97a1-865a242ceb01)
*Страница со списком курсов, включая поиск и фильтрацию*

### Детальная страница курса
![Детальная страница курса](https://github.com/user-attachments/assets/24df2bba-a479-45ef-8e4a-60b9de6d08ff)
*Подробная информация о курсе с адаптивным дизайном*

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для ваших изменений (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в ваш форк (`git push origin feature/amazing-feature`)
5. Создайте Pull Request

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. Подробности в файле [LICENSE](LICENSE).

## 👥 Автор

- MindlessMuse666
  * [GitHub](https://github.com/MindlessMuse666)
  * [Telegram](t.me/mindless_muse)
  * [Gmail](mindlessmuse.666@gmail.com)

## 🙏 Благодарности

- [NestJS](https://nestjs.com/) за отличный фреймворк
- [Next.js](https://nextjs.org/) за современный React фреймворк
- [Prisma](https://www.prisma.io/) за удобный ORM
- [Tailwind CSS](https://tailwindcss.com/) за прекрасный CSS фреймворк
- [React Query](https://tanstack.com/query/latest) за удобное управление состоянием
- [Heroicons](https://heroicons.com/) за красивые иконки 
