# QLove Path & Vercel Deploy Review

## Files changed
- index.html
- header_qlove/styles.css

## Removed
- <base href="header_qlove/" /> from index.html

## Paths changed

| File | Old path | New path | Reason |
|---|---|---|---|
| index.html | styles.css | /header_qlove/styles.css | Base tag removed |
| index.html | script.js | /header_qlove/script.js | Base tag removed |
| index.html | ssets/images/* | /header_qlove/assets/images/* | Base tag removed, path points to header_qlove directory |
| header_qlove/styles.css | url("assets/fonts/...") | url("/header_qlove/assets/fonts/...") | Relative URL hardening for reliable resolution |

## Verified assets

- [x] /header_qlove/styles.css
- [x] /header_qlove/script.js
- [x] /qlove-main.css
- [x] /qlove-main.js
- [x] /assets/gsap.min.js
- [x] /header_qlove/assets/images/mini_mochi.png?v=2
- [x] /assets/qlove-products.json

## Remaining broken paths

- None

## Local test result

Server:
node server.mjs

Result:
PASS

## Recommended Vercel settings

Application Preset:
Other

Root Directory:
./

Build Command:
(empty)

Output Directory:
(empty)

Environment Variables:
none
