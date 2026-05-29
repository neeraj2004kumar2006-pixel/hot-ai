const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const PORT = 3000;
  const BASE = `http://localhost:${PORT}`;
  const results = [];

  const checkState = async (label) => {
    const state = await page.evaluate(() => ({
      pathname: window.location.pathname,
      articlePresent: !!document.querySelector('article h1'),
      heroPresent: !!document.querySelector('.hero-section'),
      twoColPresent: !!document.querySelector('.two-column-layout'),
      h1Text: document.querySelector('h1')?.textContent?.substring(0, 60) || 'none',
    }));
    console.log(`  ${label}: path=${state.pathname}, article=${state.articlePresent}, hero=${state.heroPresent}, twoCol=${state.twoColPresent}, h1="${state.h1Text}"`);
    return state;
  };

  const clickNavLink = async (text) => {
    const navLinks = await page.$$('nav.desktop-nav a');
    for (const link of navLinks) {
      const linkText = await page.evaluate(el => el.textContent.trim(), link);
      if (linkText === text) {
        await link.click();
        await new Promise(r => setTimeout(r, 2000));
        return;
      }
    }
    console.log(`  WARNING: Link "${text}" not found`);
  };

  const clickFirstArticle = async () => {
    const link = await page.$('a[href^="/article/"]');
    if (link) {
      await link.click();
      await new Promise(r => setTimeout(r, 2000));
    }
  };

  try {
    // === TEST A: Home -> Article -> Home ===
    console.log('\n=== TEST A: Home -> Article -> Home ===');
    await page.goto(BASE, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    
    await clickFirstArticle();
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 300));
    const articleUrl = await page.url();
    console.log(`  On article: ${articleUrl}`);
    
    await clickNavLink('Home');
    const stateA = await checkState('After Home click');
    results.push({ test: 'A: Article->Home', pass: stateA.twoColPresent && !stateA.articlePresent });

    // === TEST B: Home -> Article -> AI News ===
    console.log('\n=== TEST B: Home -> Article -> AI News ===');
    await clickFirstArticle();
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 300));
    
    await clickNavLink('AI News');
    const stateB = await checkState('After AI News click');
    results.push({ test: 'B: Article->AI News', pass: !stateB.articlePresent && stateB.pathname.includes('category') });

    // === TEST C: Category -> Article -> Tech Tricks ===
    console.log('\n=== TEST C: Article -> Tech Tricks ===');
    await clickFirstArticle();
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 300));
    
    await clickNavLink('Tech Tricks');
    const stateC = await checkState('After Tech Tricks click');
    results.push({ test: 'C: Article->Tech Tricks', pass: !stateC.articlePresent && stateC.pathname === '/tech-tricks' });

    // === TEST D: Article -> Trending ===
    console.log('\n=== TEST D: Article -> Trending ===');
    await page.goto(BASE, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    await clickFirstArticle();
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 300));
    
    await clickNavLink('Trending');
    const stateD = await checkState('After Trending click');
    results.push({ test: 'D: Article->Trending', pass: !stateD.articlePresent && stateD.pathname === '/trending' });

    // === TEST E: Browser Back ===
    console.log('\n=== TEST E: Browser Back ===');
    await page.goBack();
    await new Promise(r => setTimeout(r, 2000));
    const stateE = await checkState('After Back');
    results.push({ test: 'E: Browser Back', pass: stateE.pathname.includes('/article/') });

    // === TEST F: Browser Forward ===
    console.log('\n=== TEST F: Browser Forward ===');
    await page.goForward();
    await new Promise(r => setTimeout(r, 2000));
    const stateF = await checkState('After Forward');
    results.push({ test: 'F: Browser Forward', pass: stateF.pathname === '/trending' && !stateF.articlePresent });

    // === SUMMARY ===
    console.log('\n=== RESULTS ===');
    let allPass = true;
    for (const r of results) {
      console.log(`  ${r.pass ? '✓' : '✗'} ${r.test}`);
      if (!r.pass) allPass = false;
    }
    console.log(`\n  ALL PASS: ${allPass}`);

  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
  }
})();
