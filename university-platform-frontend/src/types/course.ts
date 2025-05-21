export interface Course {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  instructor?: string;
  duration?: string;
  level?: string;
  category?: string;
  language?: string;
  published?: boolean;
  authorId: number;
  createdAt?: string;
  updatedAt?: string;
} 