import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/globals.css';
import Providers from './providers';
import { IMAGES, ROUTES } from '@/constants/global.constants';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Университетская платформа',
  description: 'Платформа для управления учебным процессом',
  icons: {
    icon: IMAGES.BRAND.FAVICON,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href={IMAGES.BRAND.FAVICON} />
      </head>
      <body className={inter.className}>
        <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <Link href={ROUTES.HOME} className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src={IMAGES.BRAND.LOGO}
                alt="Университетская платформа"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-3 text-xl font-semibold text-gray-900">Университетская платформа</span>
            </Link>
          </div>
        </div>
        <div className="pt-16">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
