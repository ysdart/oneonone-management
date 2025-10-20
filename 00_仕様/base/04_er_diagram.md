# ER図設計

## エンティティ一覧

### User（ユーザー）
- user_id (PK)
- name
- email
- role（管理者/メンター/メンバー）
- default_mentor_id (FK → User)

### MentorAssignment（担当割り当て）
- assignment_id (PK)
- member_id (FK → User)
- mentor_id (FK → User)
- month
- is_temporary

### ReportMeeting（報告会）
- report_id (PK)
- date
- description

### OneOnOneSchedule（1on1予定）
- schedule_id (PK)
- member_id (FK → User)
- mentor_id (FK → User)
- month
- scheduled_date
- status

### OneOnOneRecord（1on1記録）
- record_id (PK)
- schedule_id (FK → OneOnOneSchedule)

### OneOnOneMessage（1on1メッセージ）
- message_id (PK)
- record_id (FK → OneOnOneRecord)
- author_id (FK → User)
- content (Markdown)

### CheckItem（共通確認事項）
- check_item_id (PK)
- question_text
- active_from
- active_to

### CheckResponse（回答）
- response_id (PK)
- record_id (FK → OneOnOneRecord)
- check_item_id (FK → CheckItem)
- response_text

### EvaluationItem（評価項目）
- eval_item_id (PK)
- name
- description
- scale_min
- scale_max

### EvaluationScore（評価結果）
- score_id (PK)
- record_id (FK → OneOnOneRecord)
- eval_item_id (FK → EvaluationItem)
- score

### Goal（目標）
- goal_id (PK)
- member_id (FK → User)
- title
- description
- due_date
- status
- progress_percent

## ER図（テキスト図）

```
User ─< MentorAssignment
User ─< OneOnOneSchedule ─< OneOnOneRecord ─< OneOnOneMessage
OneOnOneRecord ─< CheckResponse ─> CheckItem
OneOnOneRecord ─< EvaluationScore ─> EvaluationItem
User ─< Goal
ReportMeeting（独立）
```
