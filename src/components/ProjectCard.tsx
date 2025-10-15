
import Link from 'next/link';

type ProjectCardProps = {
  slug: string;
  title: string;
};

export default function ProjectCard({ slug, title }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      </div>
    </Link>
  );
}
