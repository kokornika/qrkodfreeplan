import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Define your website URL
const WEBSITE_URL = 'https://qrnevjegy.hu';

// Define all your routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/vcard', changefreq: 'weekly', priority: 0.8 },
  { url: '/guide', changefreq: 'weekly', priority: 0.7 },
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/blog/digitalis-nevjegykartya-keszites-vallalkozasoknak', changefreq: 'monthly', priority: 0.8 },
  { url: '/blog/1', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog/2', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog/3', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog/4', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy', changefreq: 'monthly', priority: 0.4 },
  { url: '/terms', changefreq: 'monthly', priority: 0.4 },
];

async function generateSitemap() {
  try {
    // Create a stream to write to
    const smStream = new SitemapStream({ hostname: WEBSITE_URL });
    
    // Add each route to the sitemap
    routes.forEach(route => {
      smStream.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: new Date().toISOString()
      });
    });

    // End the stream
    smStream.end();

    // Generate sitemap XML
    const sitemapXML = await streamToPromise(smStream);

    // Write the sitemap to the public directory
    const writeStream = createWriteStream(resolve('dist', 'sitemap.xml'));
    writeStream.write(sitemapXML.toString());
    writeStream.end();

    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();