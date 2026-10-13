# FTP deployment — qlovemochi.com

## What to upload

Upload the **contents** of the generated `deploy/` folder to the document root for `qlovemochi.com` (usually `public_html`, `www`, or the directory selected under Webglobe **Web** settings). Do not upload the parent `deploy` folder itself.

## Before uploading

1. In Webglobe, confirm the document root that is assigned to `qlovemochi.com`.
2. Take a backup of the current remote site.
3. Upload `.htaccess` as well as the normal files; some FTP clients hide dotfiles by default.
4. Use binary/auto transfer mode for WebP, PNG, JPG and TTF files.

## After uploading

1. Open `https://qlovemochi.com/` in a private browser window.
2. Test hero navigation, the Mini/Extra carousel, Dorayaki, all product images and the footer.
3. Confirm `https://qlovemochi.com/robots.txt` and `https://qlovemochi.com/sitemap.xml` open successfully.
4. In Google Search Console, submit `https://qlovemochi.com/sitemap.xml` once the site is live.

## Rebuild the package after future edits

Run `node scripts/tools/build-deploy.mjs` from the project root. The command recreates `deploy/` cleanly from runtime files only; source images, demos, docs, Node modules and developer scripts are excluded.
