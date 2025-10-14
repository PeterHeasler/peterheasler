import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
};

type Project = {
  slug: string;
  title: string;
};

export default function Home() {
  // Posts
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const postFileNames = fs.readdirSync(postsDirectory);
  const posts: Post[] = postFileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
    };
  });

  // Projects
  const projectsDirectory = path.join(process.cwd(), 'src/projects');
  const projectFileNames = fs.readdirSync(projectsDirectory);
  const projects: Project[] = projectFileNames.map((fileName) => {
    const filePath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1 className="text-4xl font-bold">Peter Heasler&apos;s Blog</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-lg text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold mt-12">Projects</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-lg text-blue-500 hover:underline"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}