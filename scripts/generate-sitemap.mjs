// scripts/generate-sitemap.mjs

import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, writeFileSync } from 'fs';
import { globby } from 'globby';

// Your website's public URL
const siteUrl = 'https://peterheasler.github.io/peterheasler';

async function generateSitemap() {
  // 1. Get all your page routes
  const pages = await globby([
    'src/app/**/page.tsx',
    '!src/app/[dataType]/[slug]/page.tsx',
    '!src/app/api',           // Exclude API routes
    'src/projects/*.md',
    'src/posts/*.md',
  ]);

  // 2. Create a sitemap stream
  const sitemapStream = new SitemapStream({ hostname: siteUrl });

  // 3. Add each page to the sitemap
  pages.forEach(page => {
    // Convert file path to URL path
    const path = page
      .replace(/^(src\/app|src\/projects|src\/posts)/, '') // Remove root folder
      .replace(/\/(page)?\.(tsx|md)$/, '') // Remove file extensions and 'page' segment
      .replace(/\/index$/, ''); // Handle index routes

    sitemapStream.write({ url: path, changefreq: 'daily', priority: 0.7 });
  });

  sitemapStream.end();

  // Wait for the stream to finish and write to file
  const sitemap = await streamToPromise(sitemapStream);
  writeFileSync('public/sitemap.xml', sitemap);

  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();