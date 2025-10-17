// scripts/generate-sitemap.mjs

import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, writeFileSync } from 'fs';
import { globby } from 'globby';

const siteUrl = 'https://peterheasler.github.io/peterheasler';

async function generateSitemap() {
  const pages = await globby([
    'src/app/**/page.tsx',
    '!src/app/[dataType]/[slug]/page.tsx',
    '!src/app/api',
    'src/projects/*.md',
    'src/posts/*.md',
  ]);

  const sitemapStream = new SitemapStream({ hostname: siteUrl });

  pages.forEach(page => {
    let path = '';

    if (page.startsWith('src/projects')) {
      // Handle project files
      path = page
        .replace(/^src\/projects/, '/peterheasler/projects')
        .replace(/\.md$/, '');
    } else if (page.startsWith('src/posts')) {
      // Handle post files
      path = page
        .replace(/^src\/posts/, '/peterheasler/posts')
        .replace(/\.md$/, '');
    } else {
      // Handle regular app pages
      path = page
        .replace('src/app', '')
        .replace('/page.tsx', '')
        .replace(/\/index$/, '');
    }

    sitemapStream.write({ url: path, changefreq: 'daily', priority: 0.7 });
  });

  sitemapStream.end();

  const sitemap = await streamToPromise(sitemapStream);
  writeFileSync('public/sitemap.xml', sitemap);

  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();