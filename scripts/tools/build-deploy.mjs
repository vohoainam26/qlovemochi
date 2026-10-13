import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const deploy = resolve(root, 'deploy');
const required = [
  'index.html', '.htaccess', 'robots.txt', 'sitemap.xml',
  'assets/optimized',
  'assets/backgrounds/qlove-deluxe-mochi-background-v1.webp',
  'assets/backgrounds/qlove-deluxe-pouch-background-v1.webp',
  'assets/backgrounds/qlove-mini-mochi-background-v1.webp',
  'assets/backgrounds/qlove-snowflake-bg-minimal-v1.png',
  'assets/qlove/retail-logos',
  'assets/qlove-products.json',
  'assets/gsap.min.js',
  'assets/ScrollTrigger.min.js',
  'assets/Royal Family - Traditional Mochi, Modern Flavors - Gluten-free and Vegan Friendly',
  'header_qlove/script.js', 'header_qlove/styles.css', 'header_qlove/assets/fonts', 'header_qlove/assets/images/qlove-logo-den.png',
  'scripts/qlove-main.js', 'scripts/qlove-integrated-motion.js', 'scripts/qlove-deluxe-dorayaki-transition.js',
  'styles',
  'demos/dessert-platter/qlove_dessert_platter_FINAL_v2_ZOOM.html',
  'demos/mix-to-boba/qlove-mix-to-boba-demo2.html'
];

await rm(deploy, { recursive: true, force: true });
await mkdir(deploy, { recursive: true });

for (const relative of required) {
  const source = resolve(root, relative);
  await stat(source);
  await cp(source, resolve(deploy, relative), { recursive: true, force: true });
}

console.log(`FTP package ready: ${deploy}`);
