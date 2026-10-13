import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const products = [28, 29];

for (const number of products) {
  const source = resolve(root, `assets/qlove/products-cutout/${number}-mix-clean-v1.png`);
  const output = resolve(root, `assets/optimized/products/${number}-mix-clean-v2.webp`);
  await mkdir(dirname(output), { recursive: true });
  await sharp(source)
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  console.log(`${number}: ${metadata.width}x${metadata.height} WebP written`);
}
