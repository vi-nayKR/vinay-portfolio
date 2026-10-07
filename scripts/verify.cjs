const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.webp': 'image/webp'
};

const distDir = path.resolve(__dirname, '..', 'dist');
const screenshotDir = path.resolve(__dirname, 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const indexHtml = path.join(distDir, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(indexHtml).pipe(res);
  }
});

async function runProductionTestSuite() {
  await new Promise((resolve) => server.listen(4174, resolve));
  console.log('Production Test Server running at http://localhost:4174');

  const browser = await chromium.launch({ channel: 'chrome' });

  const viewports = [
    { name: 'desktop-1920x1080', width: 1920, height: 1080, type: 'desktop' },
    { name: 'desktop-1440x900',  width: 1440, height: 900,  type: 'desktop' },
    { name: 'laptop-1366x768',   width: 1366, height: 768,  type: 'laptop' },
    { name: 'tablet-768x1024',   width: 768,  height: 1024, type: 'tablet' },
    { name: 'mobile-390x844',    width: 390,  height: 844,  type: 'mobile' },
    { name: 'mobile-360x740',    width: 360,  height: 740,  type: 'mobile' },
  ];

  const tabs = ['home', 'skills', 'experience', 'projects', 'research', 'resume', 'contact'];

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = [];

  for (const vp of viewports) {
    console.log(`\n======================================================`);
    console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) [${vp.type}]`);
    console.log(`======================================================`);

    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    const consoleErrors = [];
    const pageErrors = [];
    const failed404s = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));
    page.on('response', (res) => {
      if (res.status() >= 400) {
        failed404s.push(`${res.status()} ${res.url()}`);
      }
    });

    for (const tab of tabs) {
      totalTests++;
      await page.goto(`http://localhost:4174/#${tab}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);
      // Card-based tabs: wait until cards mount (a cold first load can exceed the fixed delay)
      const cardSelector = { experience: '[data-experience-card]', projects: '[data-project-card]', skills: '#skills .glass-card' }[tab];
      if (cardSelector) await page.waitForSelector(cardSelector, { timeout: 5000 }).catch(() => {});

      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        await Promise.all(imgs.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = img.onerror = resolve;
          });
        }));
      });

      const metrics = await page.evaluate(() => {
        const main = document.getElementById('main-scroll');
        const images = Array.from(document.querySelectorAll('img'));
        const brokenImages = images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHorizontalScroll = docWidth > winWidth;

        return {
          scrollHeight: main ? main.scrollHeight : 0,
          clientHeight: main ? main.clientHeight : 0,
          diff: main ? main.scrollHeight - main.clientHeight : 0,
          brokenImages,
          hasHorizontalScroll,
          docWidth,
          winWidth
        };
      });

      // Home specific checks: ensure status pill is removed
      if (tab === 'home') {
        const hasStatusPill = await page.evaluate(() => {
          return document.body.textContent.includes('Available for AI & Full-Stack Roles');
        });
        if (hasStatusPill) {
          failedTests.push(`[${vp.name}] home section still contains "Available for AI & Full-Stack Roles" pill (expected removed)`);
        }
      }

      // Experience specific checks
      if (tab === 'experience') {
        const expData = await page.evaluate(() => {
          const cards = Array.from(document.querySelectorAll('[data-experience-card]'));
          let imgCount = 0;
          let maxOverflow = 0;
          cards.forEach((card) => {
            imgCount += card.querySelectorAll('img').length;
            const body = card.querySelector('.flex-1');
            if (body) {
              const diff = body.scrollHeight - body.clientHeight;
              if (diff > maxOverflow) maxOverflow = diff;
            }
          });
          return { cardCount: cards.length, imgCount, maxOverflow };
        });

        if (expData.imgCount !== 0) {
          failedTests.push(`[${vp.name}] experience cards contain ${expData.imgCount} images (expected 0, pictures removed)`);
        }
        if (expData.maxOverflow > 1) {
          failedTests.push(`[${vp.name}] experience cards have ${expData.maxOverflow}px internal content overflow`);
        }
        if (expData.cardCount === 0) {
          failedTests.push(`[${vp.name}] experience section rendered 0 cards`);
        }
      }

      // Projects specific checks
      if (tab === 'projects') {
        const projData = await page.evaluate(() => {
          const cards = Array.from(document.querySelectorAll('[data-project-card]'));
          const carousel = document.querySelector('#projects [data-carousel-total]');
          let maxOverflow = 0;
          cards.forEach((card) => {
            const diff = card.scrollHeight - card.clientHeight;
            if (diff > maxOverflow) maxOverflow = diff;
          });
          return {
            cardCount: cards.length,
            total: carousel ? Number(carousel.dataset.carouselTotal) : 0,
            perPage: carousel ? Number(carousel.dataset.carouselPerPage) : 0,
            maxOverflow,
          };
        });

        // Paged carousel: 6 projects in total, `perPage` (2 desktop/tablet, 1 phone) on screen
        if (projData.total !== 6) {
          failedTests.push(`[${vp.name}] projects carousel holds ${projData.total} projects (expected 6)`);
        }
        const expectedPerPage = vp.width >= 1024 ? 2 : 1;
        if (projData.perPage !== expectedPerPage || projData.cardCount !== expectedPerPage) {
          failedTests.push(`[${vp.name}] projects page shows ${projData.cardCount} cards (perPage=${projData.perPage}, expected ${expectedPerPage})`);
        }
        if (projData.maxOverflow > 1) {
          failedTests.push(`[${vp.name}] project cards have ${projData.maxOverflow}px internal content overflow`);
        }
      }

      // Skills specific checks
      if (tab === 'skills') {
        const skillsData = await page.evaluate(() => {
          const visibleCards = document.querySelectorAll('#skills .glass-card').length;
          const hasAlsoFamiliar = Array.from(document.querySelectorAll('#skills p')).some(p => p.textContent.includes('Also familiar with'));
          return { visibleCards, hasAlsoFamiliar };
        });

        if (skillsData.visibleCards === 0) {
          failedTests.push(`[${vp.name}] skills section has no visible cards`);
        }
        if (!skillsData.hasAlsoFamiliar) {
          failedTests.push(`[${vp.name}] skills section missing "Also familiar with" section`);
        }
      }

      // Broken image check
      if (metrics.brokenImages.length > 0) {
        failedTests.push(`[${vp.name}] Broken images in tab "${tab}": ${metrics.brokenImages.join(', ')}`);
      }

      // Horizontal scroll check
      if (metrics.hasHorizontalScroll) {
        failedTests.push(`[${vp.name}] Horizontal page overflow in tab "${tab}": docWidth=${metrics.docWidth} > winWidth=${metrics.winWidth}`);
      }

      // Capture screenshot
      const shotPath = path.join(screenshotDir, `${vp.name}-${tab}.png`);
      await page.screenshot({ path: shotPath });

      const passed = metrics.diff <= 0 && consoleErrors.length === 0 && pageErrors.length === 0 && failed404s.length === 0;
      if (passed) {
        passedTests++;
        console.log(`  ✓ [${tab.padEnd(10)}] scrollHeight=${metrics.scrollHeight}, clientHeight=${metrics.clientHeight}, diff=${metrics.diff} (OK)`);
      } else {
        const reasons = [];
        if (metrics.diff > 0) reasons.push(`Overflow by ${metrics.diff}px`);
        if (consoleErrors.length > 0) reasons.push(`Console errors: ${consoleErrors.join(' | ')}`);
        if (pageErrors.length > 0) reasons.push(`Page errors: ${pageErrors.join(' | ')}`);
        if (failed404s.length > 0) reasons.push(`404s: ${failed404s.join(' | ')}`);
        failedTests.push(`[${vp.name}] Tab "${tab}": ${reasons.join(', ')}`);
        console.log(`  ✗ [${tab.padEnd(10)}] FAILED: ${reasons.join(', ')}`);
      }
    }

    // Paged carousel: Next arrow advances the page and swaps the cards (Experience & Projects)
    for (const [tab, label, sel] of [['experience', 'Next experiences', '[data-experience-card] h3'], ['projects', 'Next projects', '[data-project-card] h3']]) {
      await page.goto(`http://localhost:4174/#${tab}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const before = await page.locator(sel).first().textContent();
      await page.locator(`button[aria-label="${label}"]`).click();
      await page.waitForTimeout(900);
      const after = await page.locator(sel).first().textContent();
      const counter = await page.locator(`#${tab} [data-carousel-total] span.tabular-nums`).textContent();
      if (before === after || !/02/.test(counter)) {
        failedTests.push(`[${vp.name}] ${tab} Next arrow did not change page (before="${before}", after="${after}", counter="${counter}")`);
      } else {
        console.log(`  ✓ ${tab} carousel paged: "${before.trim()}" -> "${after.trim()}" (${counter.trim()})`);
      }
    }

    // Interactive Carousel Check (Experience & Projects)
    if (vp.type === 'desktop') {
      console.log('  Testing Carousel Button Navigation (Experience)...');
      await page.goto('http://localhost:4174/#experience', { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);

      const beforeX = await page.evaluate(() => {
        const track = document.querySelector('#experience [drag="x"]') || document.querySelector('#experience .flex.gap-4');
        return track ? track.getBoundingClientRect().left : null;
      });

      const nextBtn = page.locator('button[aria-label="Next experience"]');
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await page.waitForTimeout(350);
        const afterX = await page.evaluate(() => {
          const track = document.querySelector('#experience [drag="x"]') || document.querySelector('#experience .flex.gap-4');
          return track ? track.getBoundingClientRect().left : null;
        });

        if (afterX !== null && afterX < beforeX) {
          console.log(`  ✓ Carousel stepped forward smoothly: beforeX=${Math.round(beforeX)}px -> afterX=${Math.round(afterX)}px`);
        } else {
          console.log(`  ℹ Carousel position (before: ${Math.round(beforeX)}px, after: ${Math.round(afterX)}px)`);
        }
      }
    }

    // Theme Switcher Full Cycle Check
    if (vp.name === 'desktop-1440x900') {
      console.log('  Testing Full Theme Switcher Cycle...');
      const themeBtn = page.locator('button[aria-label="Change theme"]');
      const themeSequence = [
        { id: 'neon', name: 'Neon', cls: 'theme-neon' },
        { id: 'arctic', name: 'Arctic', cls: 'theme-arctic' },
        { id: 'void', name: 'Void', cls: 'theme-void' },
        { id: 'aurora', name: 'Aurora', cls: 'theme-aurora' },
        { id: 'light', name: 'Light', cls: 'theme-light' },
      ];

      for (const t of themeSequence) {
        await themeBtn.click();
        await page.waitForTimeout(100);
        await page.locator(`button[data-theme-id="${t.id}"]`).click();
        await page.waitForTimeout(150);
        const hasClass = await page.evaluate((cls) => document.documentElement.classList.contains(cls), t.cls);
        const storageVal = await page.evaluate(() => localStorage.getItem('theme'));
        if (hasClass && storageVal === t.id) {
          console.log(`  ✓ Theme ${t.name}: correctly applied class .${t.cls} and persisted`);
        } else {
          failedTests.push(`Theme ${t.name} failed: class=${hasClass}, localStorage=${storageVal}`);
        }
      }

      // Check hero profile background in Light theme
      await page.goto('http://localhost:4174/#home', { waitUntil: 'networkidle' });
      const avatarImg = page.locator('#home img[alt="Vinay K R"]:visible').first();
      await avatarImg.waitFor({ timeout: 3000 });
      const avatarSrc = await avatarImg.getAttribute('src');
      const avatarBg = await avatarImg.evaluate((img) => window.getComputedStyle(img.parentElement).backgroundColor);
      if (avatarBg === 'rgb(255, 255, 255)' && avatarSrc.includes('avatar-light.webp')) {
        console.log(`  ✓ Hero profile background is pure white in Light theme (${avatarBg}, src=${avatarSrc})`);
      } else {
        failedTests.push(`Hero profile background is not white in Light theme (got ${avatarBg}, src=${avatarSrc})`);
      }

      // Sound Toggle Check (turned on by default, mute/unmute icon toggles)
      console.log('  Testing Sound Toggle Button...');
      const muteBtn = page.locator('button[aria-label="Mute sound effects"]').first();
      const isSoundOn = await muteBtn.isVisible();
      if (isSoundOn) {
        console.log(`  ✓ Sound enabled by default (Mute icon visible)`);
        await muteBtn.click();
        await page.waitForTimeout(100);
        const unmuteBtn = page.locator('button[aria-label="Enable sound effects"]').first();
        const isMuted = await unmuteBtn.isVisible();
        if (isMuted) {
          console.log(`  ✓ Sound successfully muted (Unmute icon visible)`);
          await unmuteBtn.click(); // restore enabled
          await page.waitForTimeout(100);
        } else {
          failedTests.push('Sound toggle failed to switch to muted icon');
        }
      } else {
        failedTests.push('Sound not enabled by default');
      }
    }

    // Mobile Drawer Navigation Check
    if (vp.type === 'mobile') {
      console.log('  Testing Mobile Drawer Navigation...');
      await page.goto('http://localhost:4174/#home', { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);

      const hamburger = page.locator('button[aria-label="Menu"]');
      await hamburger.click();
      await page.waitForTimeout(200);

      const projBtn = page.locator('div.grid-cols-4 button:has-text("Projects")');
      if (await projBtn.isVisible()) {
        await projBtn.click();
        await page.waitForTimeout(300);
        const currentHash = await page.evaluate(() => window.location.hash);
        if (currentHash === '#projects') {
          console.log('  ✓ Mobile menu drawer navigated to #projects successfully');
        } else {
          failedTests.push(`Mobile drawer navigation failed: expected #projects, got ${currentHash}`);
        }
      } else {
        failedTests.push(`Mobile drawer Projects button not visible`);
      }
    }

    // Contact Form Submission Check
    if (vp.name === 'desktop-1440x900') {
      console.log('  Testing Contact Form Submission...');
      await page.goto('http://localhost:4174/#contact', { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);

      await page.fill('input[type="text"]', 'Playwright Automated Tester');
      await page.fill('input[type="email"]', 'tester@playwright.dev');
      await page.fill('textarea', 'Production verification test message.');

      const submitBtn = page.locator('button[type="submit"]');
      await submitBtn.click();
      await page.waitForTimeout(400);

      const isThankYouVisible = await page.locator('text=Message Sent Successfully!').isVisible();
      if (isThankYouVisible) {
        console.log('  ✓ Contact form submitted successfully with "Message Sent Successfully!" confirmation');
      } else {
        failedTests.push('Contact form submission did not show "Message Sent Successfully!"');
      }
    }

    await page.close();
  }

  await browser.close();
  server.close();

  console.log('\n======================================================');
  console.log(`TEST SUITE SUMMARY: ${passedTests}/${totalTests} section checks passed`);
  if (failedTests.length === 0) {
    console.log('🎉 ALL PRODUCTION-READY VERIFICATION SUITE CHECKS PASSED!');
    process.exit(0);
  } else {
    console.error('❌ Failed tests:');
    failedTests.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
}

runProductionTestSuite().catch((err) => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
