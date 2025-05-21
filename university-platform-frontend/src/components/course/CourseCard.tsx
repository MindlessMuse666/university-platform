import { Course } from '../../types/course';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link href={`/courses/${course.slug}`}>
        <a className="block">
          <div className="h-48 bg-gray-200 overflow-hidden">
            {course.imageUrl && (
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 line-clamp-2">{course.description}</p>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500">
                {course.author?.name || 'Unknown author'}
              </span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CourseCard;