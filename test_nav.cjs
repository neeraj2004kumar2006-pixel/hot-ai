const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture browser console logs
  page.on('console', msg => console.log(`[BROWSER] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.error(`[BROWSER_ERROR] ${err.message}`));

  try {
    console.log('Navigating to http://localhost:4173...');
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
    
    console.log('Homepage loaded. Clicking first article...');
    await page.waitForSelector('.premium-card h3');
    console.log('Homepage loaded. Navigating to article directly...');
    await page.goto('http://localhost:4173/article/future-of-ai-workplace-2025', { waitUntil: 'networkidle2' });
    
    console.log('Waiting for Article to render...');
    await new Promise(r => setTimeout(r, 1000));
    console.log('Article URL:', await page.url());
    
    console.log('Scrolling down the article to trigger useScroll...');
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 500));
    
    console.log('Article loaded. Clicking Home link in Navbar...');
    const links = await page.$$('nav.desktop-nav a');
    for (let link of links) {
      const text = await page.evaluate(el => el.textContent, link);
      if (text.trim() === 'Home') {
        await link.click();
        break;
      }
    }
    
    console.log('Clicked Home. Waiting to see if URL changes and content updates...');
    await new Promise(r => setTimeout(r, 2000));
    
    const url = await page.url();
    console.log(`Final URL: ${url}`);
    
    const html = await page.evaluate(() => {
      const main = document.querySelector('.main-content');
      return main ? main.innerHTML.substring(0, 500) : 'No .main-content';
    });
    console.log(`HTML in .main-content: ${html}`);
    
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
  }
})();
