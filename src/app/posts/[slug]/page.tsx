import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

type Post = {
  title: string;
  date: string;
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
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

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <article>
          <Link href="/" className="text-blue-500 hover:underline">&larr; Back to Home</Link>
          <h1 className="text-4xl font-bold">{postData.title}</h1>
          <div className="text-gray-500">{postData.date}</div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    </main>
  );
}
