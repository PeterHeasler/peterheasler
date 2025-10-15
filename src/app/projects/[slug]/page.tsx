import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import Link from 'next/link';

type Project = {
  title: string;
  date: string;
  contentHtml: string;
};

const projectsDirectory = path.join(process.cwd(), 'src/projects');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

async function getProjectData(slug: string): Promise<Project> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const projectData = await getProjectData(slug);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <article>
          <Link href="/" className="text-blue-500 hover:underline">&larr; Back to Home</Link>
          <h1 className="text-4xl font-bold">{projectData.title}</h1>
          <div className="text-gray-500">{projectData.date}</div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
        </article>
      </div>
    </main>
  );
}
