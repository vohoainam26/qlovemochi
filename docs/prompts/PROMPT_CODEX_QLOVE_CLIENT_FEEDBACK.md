# PROMPT CODEX — QLove Client Feedback Handoff Workflow

## Vai trò

Hãy làm việc với vai trò **website distributor / web agency handoff team** đang bàn giao website QLove cho khách hàng review.

Mục tiêu không phải tiếp tục redesign website ngay lập tức.

Mục tiêu là tạo một quy trình feedback chuyên nghiệp để khách hàng có thể review **từng series / chapter** của website, ghi rõ thay đổi mong muốn, mức ưu tiên và trạng thái duyệt.

---

# 1. Deliverables bắt buộc

Tạo hoặc chuẩn bị các deliverable sau:

```text
QLove_Client_Feedback_Template.xlsx
CLIENT_FEEDBACK_GUIDE.md
```

Nếu project đã có file feedback tương đương thì cập nhật file hiện có, không tạo duplicate không cần thiết.

Nếu môi trường hiện tại có quyền tạo Google Sheets trực tiếp thì có thể tạo Google Sheet từ template.

Nếu không có quyền Google Drive / Google Sheets:

- không giả vờ đã tạo Google Sheet
- tạo file Excel `.xlsx`
- ghi hướng dẫn để người phụ trách upload lên Google Drive và chuyển thành Google Sheets
- để placeholder cho link Google Sheet thật sau khi được tạo

---

# 2. Không public feedback link trên production website

Feedback sheet là tài liệu làm việc giữa distributor/developer và client.

Mặc định:

- KHÔNG đặt Google Sheet feedback link công khai trong website production
- KHÔNG đưa link vào navigation public
- KHÔNG để search engine index link feedback

Feedback link nên được gửi qua:

- email bàn giao
- private handoff document
- Slack / Teams / WhatsApp nội bộ
- project management tool

Chỉ tích hợp link vào website nếu client yêu cầu rõ ràng.

---

# 3. Google Sheets workflow đề xuất

Nếu dùng Google Sheets, workflow mong muốn:

```text
Developer / Distributor
        ↓
Create feedback template
        ↓
Upload XLSX to Google Drive
        ↓
Open with Google Sheets
        ↓
Share client link
        ↓
Client reviews each series
        ↓
Developer consolidates issues
        ↓
Fixes implemented
        ↓
Ready for client re-check
        ↓
Client approves
```

## Sharing permission

Ưu tiên:

```text
Specific client emails → Editor
```

hoặc nếu muốn khách chỉ ghi comment:

```text
Specific client emails → Commenter
```

Không khuyến nghị:

```text
Anyone with the link → Editor
```

trừ khi client yêu cầu.

---

# 4. Series cần có trong feedback template

Tối thiểu phải có các series hiện tại:

```text
10 — QLove Mix Mochi
11 — Double Filling
12 — Custard Mochi
13 — Boba Standing Pouch
14 — QLove Pouch Mix
15 — Dubai Style
```

Cho phép thêm series mới sau này.

Không hardcode workbook theo cách khiến không thể thêm series.

---

# 5. Sheet: Series Feedback

Mỗi series là một row.

Các column tối thiểu:

```text
Series No.
Series / Chapter
Section URL
Review Status
Overall Decision
Priority
Product Size & Layout
Animation / Motion
Transition to Next Series
Click / Hover Interaction
Copy / Text
Mobile / Responsive
Client Comments
Requested Changes
Reviewer
Review Date
```

## Review Status dropdown

```text
Not reviewed
In review
Changes requested
Ready for client re-check
Approved
```

## Overall Decision dropdown

```text
Keep as is
Revise
Major rework
Remove / replace
```

## Priority dropdown

```text
Critical
High
Medium
Low
```

---

# 6. Sheet: Issue Log

Cho feedback chi tiết, mỗi issue = một row.

Columns:

```text
Issue ID
Series
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

## Category dropdown

```text
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
Other
```

## Issue Status

```text
Open
In progress
Ready for client re-check
Approved
Won't change
```

---

# 7. Sheet: Summary

Tạo summary đơn giản gồm:

```text
Total listed series
Approved series
Changes requested
Open issues
High / Critical issues
```

Có thể dùng formulas.

Không cần dashboard phức tạp.

---

# 8. Client instructions

Trong `CLIENT_FEEDBACK_GUIDE.md`, viết hướng dẫn ngắn cho client.

Ví dụ:

```md
# QLove Website Review

Thank you for reviewing the new QLove website.

Please review the website series by series rather than sending one long general message.

For each series, please check:

1. Product size and layout
2. Animation and movement
3. Transition into the next series
4. Hover / click interaction
5. Text and copy
6. Mobile experience

If something needs to change, please describe:

- what you see now
- what you want changed
- how important the change is

Please use the Issue Log for specific problems.
```

---

# 9. Section URLs

Nếu website production đã deploy, hãy lấy production URL hiện tại.

Ví dụ:

```text
https://qlovemochi.vercel.app/
```

Nếu mỗi series có anchor ID, điền URL trực tiếp:

```text
https://.../#mix
https://.../#double
https://.../#custard
https://.../#boba
https://.../#pouch
https://.../#dubai
```

Nhưng chỉ điền nếu anchor thực tế hoạt động.

Không invent URL.

Nếu chưa có section anchors, để URL homepage và ghi rõ chapter name.

---

# 10. Feedback quality rules

Khuyến khích client feedback cụ thể.

Không chỉ:

```text
I don't like this.
```

Khuyến khích:

```text
Product packaging feels too small compared with the headline.
Please increase the product group by approximately 20–30% while keeping the current transition.
Priority: High.
```

Hoặc:

```text
The transition from Double Filling to Custard is good.
Please keep the cream merge concept but make the cream pool slightly smaller.
```

---

# 11. Distributor workflow after receiving feedback

Sau khi client gửi feedback:

1. Review toàn bộ rows mới.
2. Merge duplicate comments.
3. Tạo Issue Log row cho các thay đổi cụ thể.
4. Set priority.
5. Implement fixes.
6. Update `Developer response / fix`.
7. Set:

```text
Ready for client re-check
```

8. Client re-checks.
9. Client sets:

```text
Approved
```

---

# 12. Version control

Không sửa feedback cũ theo cách mất lịch sử.

Nếu một yêu cầu thay đổi:

- giữ original client request
- ghi developer response ở column riêng
- dùng status để theo dõi lifecycle

Nếu cần version:

```text
Website review round 1
Website review round 2
Final approval
```

---

# 13. Optional Google Sheet link placeholder

Trong `CLIENT_FEEDBACK_GUIDE.md`, thêm:

```md
## Feedback Sheet

Google Sheet:
[ADD PRIVATE CLIENT FEEDBACK LINK HERE]

Website:
[ADD PRODUCTION WEBSITE LINK HERE]
```

Sau khi Google Sheet thật được tạo, người phụ trách chỉ cần replace placeholder.

---

# 14. Nếu tạo Excel

File Excel phải:

- dễ đọc
- freeze header
- có dropdowns
- wrap text
- có conditional formatting hợp lý
- không dùng màu quá rối
- có ít nhất các sheet:
  - README
  - Series Feedback
  - Issue Log
  - Summary

Ưu tiên palette QLove nếu phù hợp.

---

# 15. Sau khi hoàn thành

Tự review file và report:

```text
Client feedback package completed.

Files created:
- QLove_Client_Feedback_Template.xlsx
- CLIENT_FEEDBACK_GUIDE.md

Google Sheet:
CREATED / NEEDS MANUAL UPLOAD

Series included:
- Mix Mochi
- Double Filling
- Custard Mochi
- Boba Standing Pouch
- QLove Pouch Mix
- Dubai Style

Recommended sharing permission:
Specific client emails — Editor or Commenter

Remaining action:
- Upload XLSX to Google Drive if Google Sheets creation is unavailable
- Replace Google Sheet placeholder with private client link
```
