import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const update = resolve(root, 'outputs', 'qlovemochi-dessert-mixfix-update');
const files = [
  'index.html',
  'scripts/qlove-main.js',
  'demos/dessert-platter/qlove_dessert_platter_FINAL_v2_ZOOM.html',
  'demos/mix-to-boba/qlove-mix-to-boba-demo2.html',
  'assets/optimized/dessert-platter/scene-bg.jpg',
  'assets/optimized/dessert-platter/dieline.jpg',
  'assets/optimized/products/28-mix-clean-v2.webp',
  'assets/optimized/products/29-mix-clean-v2.webp'
];

await rm(update, { recursive: true, force: true });
await mkdir(update, { recursive: true });

for (const relative of files) {
  await cp(resolve(root, relative), resolve(update, relative), { force: true });
}

await writeFile(resolve(update, 'README-UPDATE.txt'), `QLove Dessert Platter + Mix image update\n\nExtract this ZIP directly into /public_html/ and allow overwrite only for matching files.\nDo not delete existing files or folders.\n\nIncluded changes:\n- Faster Dessert Platter 3D assets and rendering setup.\n- Fresh WebP image URLs for Traditional Mix and Fruity Mix.\n- Mix-to-Boba preload after the homepage finishes loading, avoiding a blank wait on scroll.\n`, 'utf8');

console.log(`Small update package ready: ${update}`);
