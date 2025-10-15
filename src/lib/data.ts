// lib/data.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  date?: string;
};

// Generic function to read front matter from a directory
function getFrontMatter(directoryPath: string): Post[] {
  const fileNames = fs.readdirSync(directoryPath);

  return fileNames.map((fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.mdx?$/, ''), // Handles both .md and .mdx
      title: data.title,
      // You can add more front matter fields here (e.g., date, excerpt)
    };
  });
}

// ----------------------------------------------------

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  // Add sorting logic here if needed (e.g., sort by date)
  return getFrontMatter(postsDirectory) as Post[];
}

export function getAllProjects(): Post[] {
  const projectsDirectory = path.join(process.cwd(), 'src/projects');
  return getFrontMatter(projectsDirectory) as Post[];
}