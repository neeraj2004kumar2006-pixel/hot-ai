const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const PORT = 3000;
  const BASE = `http://localhost:${PORT}`;

  try {
    const slug = 'windows-11-advanced-power-user-hacks';
    console.log(`=== TEST: Direct navigation to /article/${slug} ===`);
    await page.goto(`${BASE}/article/${slug}`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    
    const state = await page.evaluate(() => {
      return {
        h1Text: document.querySelector('h1')?.textContent,
        notFound: document.querySelector('h1')?.textContent === 'Article not found'
      };
    });
    console.log(`Result: ${state.notFound ? 'NOT FOUND' : 'FOUND'}`);
    console.log(`H1 Text: ${state.h1Text}`);

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
  }
})();
