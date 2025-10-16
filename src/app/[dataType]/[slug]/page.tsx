import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import ProseThemeWrapper from '@/components/ProseThemeWrapper';

type Content = {
  title: string;
  date: string;
  contentHtml: string;
};

const contentDirectory = (dataType: string) => path.join(process.cwd(), `src/${dataType}`);

export async function generateStaticParams() {
  const dataTypes = ['posts', 'projects'];
  const params = dataTypes.flatMap((dataType) => {
    const fileNames = fs.readdirSync(contentDirectory(dataType));
    return fileNames.map((fileName) => ({
      dataType,
      slug: fileName.replace(/\.md$/, ''),
    }));
  });
  return params;
}

async function getContentData(dataType: string, slug: string): Promise<Content> {
  const fullPath = path.join(contentDirectory(dataType), `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const md = new MarkdownIt();
  const contentHtml = md.render(matterResult.content);

  return {
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };
}

type Props = {
  params: Promise<{ dataType: string, slug: string }>;
};

export default async function ContentPage({ params }: Props) {
  const { dataType, slug } = await params;
  const contentData = await getContentData(dataType, slug);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <article>
          <h1 className="text-4xl font-bold">{contentData.title}</h1>
          <div className="text-gray-500">{contentData.date}</div>
          <ProseThemeWrapper>
            <div dangerouslySetInnerHTML={{ __html: contentData.contentHtml }} />
          </ProseThemeWrapper>
        </article>
      </div>
    </main>
  );
}
