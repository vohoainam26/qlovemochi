# PROMPT CODEX — QLove Full Website Client Feedback Handoff

## Vai trò

Hãy làm việc với vai trò **website distributor / web agency handoff team** đang bàn giao website QLove cho khách hàng review.

Website production hiện tại:

```text
https://qlovemochi.vercel.app/
```

Mục tiêu là tạo một hệ thống feedback chuyên nghiệp để khách hàng review **toàn bộ website**, không chỉ các product series.

Phạm vi review bắt buộc:

- Header
- Hero slider
- Intro / story sections
- Collection navigation
- Tất cả product series
- Footer / retail / contact / legal
- Mobile / responsive
- Hover / click / transition / motion

Không public feedback link trên production website.

---

# 1. Deliverables bắt buộc

Tạo / cập nhật:

```text
QLove_Full_Website_Client_Feedback.xlsx
CLIENT_FEEDBACK_GUIDE.md
```

Nếu có quyền Google Sheets:

- tạo Google Sheet từ template
- chia sẻ private với client

Nếu không có quyền Google Drive / Google Sheets:

- không giả vờ đã tạo
- xuất file XLSX
- ghi hướng dẫn upload XLSX lên Google Drive
- dùng placeholder cho link Google Sheet thật

---

# 2. Website source of truth

Trước khi tạo workbook:

1. Mở website production:
   `https://qlovemochi.vercel.app/`
2. Đọc implementation hiện tại trong project.
3. Xác nhận section IDs / anchor IDs thực tế.
4. Không invent URL hoặc anchor.
5. Nếu section không có anchor ID:
   - dùng homepage URL
   - ghi chú "No dedicated anchor"

---

# 3. Phạm vi review đầy đủ

Workbook phải có ít nhất các review area sau.

## HEADER / GLOBAL

### G01 — Header / Main Navigation

Review:

- QLove logo
- HOME
- OUR MOCHI
- ABOUT
- WHERE TO FIND US
- CONTACT
- spacing
- readability
- desktop/mobile navigation
- scroll behaviour
- active / hover states

Direct URL:

```text
https://qlovemochi.vercel.app/#top
```

### G02 — Hero Product Slider

Hero hiện có 7 slides đại diện cho:

- Mini Mochi
- Deluxe Pouch
- Snowflake
- Dorayaki
- Double Filling
- Boba Mochi
- Custard Mochi

Review:

- product scale
- giant title
- slide copy
- decorations
- arrows
- slide counter
- flavour thumbnail navigation
- random button
- transition between slides
- responsive

Direct URL:

```text
https://qlovemochi.vercel.app/#top
```

### G03 — Intro Story

Section:

```text
LOVE
WRAPPED
IN MOCHI
```

Anchor:

```text
#qlove-intro-story
```

Direct URL:

```text
https://qlovemochi.vercel.app/#qlove-intro-story
```

Review:

- headline scale
- product composition
- portal / decorative background
- pacing
- transition into story

### G04 — QLove Collection Story

Review:

- 4 story scenes
- product size
- visual hierarchy
- colour transitions
- scroll pacing
- copy
- product readability

If no dedicated anchor exists, use homepage URL.

### G05 — Flavour Marquee

Review:

- marquee speed
- text readability
- forward/reverse rails
- product position
- visual noise
- reduced motion

### G06 — Collection Jump Navigation

Review:

- series labels
- anchor accuracy
- active state
- readability
- desktop/mobile usability
- whether user understands it is navigation

---

# 4. Product series

## 01 — Mini Mochi 80g

Anchor:

```text
#mini-mochi
```

Direct URL:

```text
https://qlovemochi.vercel.app/#mini-mochi
```

Review:

- 8 flavours
- product sizing
- horizontal layout
- arrows
- counter
- image quality
- product labels
- mobile

---

## 02 — Extra To Love / Premium Filling Mini

Anchor:

```text
#extra-to-love
```

Direct URL:

```text
https://qlovemochi.vercel.app/#extra-to-love
```

Review:

- 5 premium filling mini flavours
- card scale
- horizontal motion
- current flavour counter
- progress
- spacing
- mobile

---

## 03 — Deluxe Pouch 120g

Anchor:

```text
#deluxe-pouch-120g
```

Direct URL:

```text
https://qlovemochi.vercel.app/#deluxe-pouch-120g
```

Review:

- all pouch flavours
- product size
- carousel / wall layout
- hover images
- arrows
- spacing
- background
- mobile

---

## 04 — Deluxe Mochi

Anchor:

```text
#deluxe-mochi
```

Direct URL:

```text
https://qlovemochi.vercel.app/#deluxe-mochi
```

Review:

- 168g / 180g filter
- collection overview
- flavour selection
- selected hero product
- product hierarchy
- interaction
- copy
- responsive

---

## 05 — Dorayaki

Anchor:

```text
#dorayaki
```

Direct URL:

```text
https://qlovemochi.vercel.app/#dorayaki
```

Review:

- 4 flavours
- overview banner
- flavour tabs
- selected state
- description
- rail controls
- transition from Deluxe Mochi
- mobile

---

## 07 — Snowflake Cake

Anchor:

```text
#snowflake
```

Direct URL:

```text
https://qlovemochi.vercel.app/#snowflake
```

Review:

- 5 flavours
- overview cluster
- focus interaction
- product scale
- selected flavour information
- labels
- mobile

---

## 08 — Signature Dessert Platter 450g

Anchor:

```text
#mix-450g
```

Direct URL:

```text
https://qlovemochi.vercel.app/#mix-450g
```

Review:

- intro box scale
- "scroll to open the box"
- opening transition
- 3 flavour presentation
- focus state
- product / copy hierarchy
- mobile

---

## 09 — Traditional Mochi 180g

Anchor:

```text
#traditional-mochi
```

Direct URL:

```text
https://qlovemochi.vercel.app/#traditional-mochi
```

Review full flow:

```text
STACK
→ FAN
→ SPOTLIGHT
→ LINEUP
```

Also review:

- 7 products
- hover states
- product labels
- selected flavour copy
- pacing
- mobile

---

## 10 — QLove Mix Mochi 180g

Anchor:

```text
#mix-180g
```

Direct URL:

```text
https://qlovemochi.vercel.app/#mix-180g
```

Review:

- Traditional Mix
- Fruity Mix
- product size
- split layout
- click detail
- hover
- transition into Double Filling
- mobile

---

## 11 — Double Filling

Anchor:

```text
#double-filling
```

Direct URL:

```text
https://qlovemochi.vercel.app/#double-filling
```

Review:

- 6 products
- orbit
- depth
- selected state
- hover/click
- product labels
- transition into Custard

Special transition review:

```text
Double Filling
→ cream core
→ cream ribbons
→ cream pool
→ Custard rise
```

---

## 12 — Custard Mochi 168g

Anchor:

```text
#custard-168g
```

Direct URL:

```text
https://qlovemochi.vercel.app/#custard-168g
```

Review:

- 3 products
- Raspberry Custard
- Kiwi Custard
- Lemon Custard
- product size
- composition
- soft focus / lens
- click state
- transition into Boba
- mobile

---

## 13 — Boba Standing Pouch 120g

Anchor:

```text
#boba-pouch-120g
```

Direct URL:

```text
https://qlovemochi.vercel.app/#boba-pouch-120g
```

Review:

- 3 products
- pearls
- gravity motion
- product hierarchy
- click state
- hover
- transition into Pouch Mix
- mobile

---

## 14 — QLove Pouch Mix 120g

Anchor:

```text
#pouch-mix-120g
```

Direct URL:

```text
https://qlovemochi.vercel.app/#pouch-mix-120g
```

Review:

- 6 pouch products
- moving shelves
- row spacing
- product size
- assorted spotlight
- click state
- transition into Dubai
- mobile

---

## 15 — Dubai Style

Anchor:

```text
#dubai
```

Direct URL:

```text
https://qlovemochi.vercel.app/#dubai
```

Review:

- 45g
- 168g
- relative scale
- dark premium atmosphere
- gold / pistachio visual language
- hover
- click detail
- final chapter feel
- mobile

---

# 5. Footer review

Footer phải được review như một phần chính của website.

## F01 — Unified Footer / Where to Find Us / Contact

Anchor:

```text
#retail
```

Direct URL:

```text
https://qlovemochi.vercel.app/#retail
```

Review:

- single-block footer composition
- headline:
  `QLove is out there. Come find us.`
- supporting copy
- Find a store CTA
- Wholesale CTA
- Contact CTA
- retail/store image
- contact email
- social icons
- spacing
- colour
- mobile

## F02 — Retail Partner Ticker / Store Presence

Anchor:

```text
#qlove-footer-retail
```

Direct URL:

```text
https://qlovemochi.vercel.app/#qlove-footer-retail
```

Review:

- retailer ticker
- speed
- readability
- repetition
- retail/store image
- visual continuity from previous section
- reduced motion

## F03 — Brand Close / Legal / Back to Top

Use:

```text
https://qlovemochi.vercel.app/#retail
```

Review:

- giant QLove word
- tagline
- `Europe · Retail · Wholesale`
- copyright
- Privacy
- Cookies
- Terms
- back-to-top button
- keyboard interaction
- mobile

---

# 6. Workbook structure

Create sheets:

```text
README
Review Map
Full Website Feedback
Issue Log
Summary
```

---

# 7. Sheet — Review Map

Columns:

```text
Order
Area Type
Review Area / Series
Current Website Link
Anchor / ID
What to Review
```

This is the client's map of the full site.

---

# 8. Sheet — Full Website Feedback

Columns:

```text
Area Type
Order
Review Area / Series
Direct URL
Review Status
Overall Decision
Priority
Visual Hierarchy / Layout
Animation / Motion
Transition / Flow
Interaction / Navigation
Copy / Text
Mobile / Responsive
Client Comments
Requested Changes
Reviewer
Review Date
```

## Review Status

Dropdown:

```text
Not reviewed
In review
Changes requested
Ready for client re-check
Approved
```

## Overall Decision

```text
Keep as is
Revise
Major rework
Remove / replace
```

## Priority

```text
Critical
High
Medium
Low
```

---

# 9. Sheet — Issue Log

One issue per row.

Columns:

```text
Issue ID
Area / Series
Category
Priority
Status
Page / Section URL
What the client sees
Requested change
Developer response / fix
Owner
Created
Target date
Client re-check
Final note
```

Category should include:

```text
Header / Navigation
Visual hierarchy
Product size
Layout
Animation
Transition
Hover / Click
Copy / Text
Mobile
Accessibility
Performance
Asset / Image
Footer / Contact
Retail / Store presence
Other
```

---

# 10. Sheet — Summary

Track:

```text
Total review areas
Product series
Header/global areas
Footer areas
Approved areas
Changes requested
Open issues
High / Critical issues
```

---

# 11. Google Sheets handoff

After XLSX is ready:

If Google Sheets integration is available:

1. Upload / create Google Sheet.
2. Keep sharing private.
3. Prefer:
   `Specific client emails → Editor`
   or
   `Specific client emails → Commenter`
4. Return the private Google Sheet link.

If integration is NOT available:

1. Export XLSX.
2. Do not claim Google Sheet was created.
3. Add instructions:
   `Google Drive → New / Upload → Open with Google Sheets → Share`
4. Return the XLSX path.

---

# 12. Client instruction

Create `CLIENT_FEEDBACK_GUIDE.md`.

Explain to client:

For every area, check:

1. Visual hierarchy / layout
2. Product size
3. Animation / motion
4. Transition / flow
5. Hover / click / navigation
6. Copy / text
7. Mobile / responsive

Ask client to write:

```text
What I see now:
...

What I want changed:
...

Priority:
High / Medium / Low
```

Avoid vague comments such as:

```text
I don't like this.
```

Prefer:

```text
The products in QLove Pouch Mix feel too small compared with the title.
Please enlarge the pouch group while keeping the existing moving-shelf concept.
Priority: High.
```

---

# 13. Feedback link must stay private

Do NOT:

- place feedback link in production navigation
- expose Google Sheet publicly
- add feedback sheet to footer
- publish client notes in website source

The feedback sheet is a private handoff tool.

---

# 14. Final Codex response

When complete:

```text
QLove full-site client feedback package completed.

Production website:
https://qlovemochi.vercel.app/

Review areas included:
- Header / hero
- Global intro/story
- Every current product series
- Unified footer / retail / contact / legal

Files:
- QLove_Full_Website_Client_Feedback.xlsx
- CLIENT_FEEDBACK_GUIDE.md

Google Sheet:
CREATED / NEEDS MANUAL UPLOAD

Sharing recommendation:
Specific client emails — Editor or Commenter

Remaining action:
...
```
