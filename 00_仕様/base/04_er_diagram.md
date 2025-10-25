# ER図設計

## エンティティ一覧

### User（ユーザー）
- user_id (PK)
- name
- role（管理者/メンター/メンバー）
- default_mentor_id (FK → User, NULL許容) ※メンバーのデフォルトメンター
- created_at
- updated_at

### MemberProfile（メンバープロフィール）
- profile_id (PK)
- user_id (FK → User, UNIQUE) ※メンバーのみ
- department（部署）
- favorite_food_genre（好きな食べ物ジャンル）
- favorite_drink（好きな飲み物）
- hobby（趣味）
- nearest_station（最寄り駅）
- birthday（誕生日）
- free_format_section（フリーフォーマットセクション）
- created_at
- updated_at

### OneOnOneRecord（1on1記録）
- record_id (PK)
- member_id (FK → User)
- mentor_id (FK → User)
- actual_date（実施日、NULL許容）
- month（対象月）
- status（未確定/予定確定/実施済）
- created_at
- updated_at

### CommonQuestion（共通質問）
- question_id (PK)
- question_text（質問文）
- active_from（適用開始日）
- active_to（適用終了日、NULL許容）
- order_index（表示順序）
- is_active（有効フラグ）
- created_at
- updated_at

### QuestionResponse（質問回答）
- response_id (PK)
- record_id (FK → OneOnOneRecord)
- question_id (FK → CommonQuestion)
- response_text（回答内容）
- created_at
- updated_at

### Goal（目標）
- goal_id (PK)
- member_id (FK → User)
- goal_text（目標内容）
- active_from（適用開始日）
- active_to（適用終了日、NULL許容）
- order_index（表示順序）
- is_active（有効フラグ）
- created_at
- updated_at

### GoalResponse（目標進捗）
- response_id (PK)
- record_id (FK → OneOnOneRecord)
- goal_id (FK → Goal)
- status（進捗状況）
- progress_percent（進捗率、0-100）
- memo（メモ、NULL許容）
- created_at
- updated_at

### FreeFormatSection（フリーフォーマット部分）
- section_id (PK)
- record_id (FK → OneOnOneRecord)
- order_index（表示順序）
- title（タイトル）
- content（内容、Markdown形式）
- created_at
- updated_at

### SecretMemo（シークレットメモ）
- memo_id (PK)
- record_id (FK → OneOnOneRecord)
- mentor_id (FK → User) ※作成者
- order_index（表示順序）
- title（タイトル）
- content（内容、Markdown形式）
- created_at
- updated_at

## テーブル関係性

### 主要な関係
1. **User → MemberProfile**: 1対1（メンバーのみ）
2. **User → OneOnOneRecord**: 1対多（member_id, mentor_id）
3. **OneOnOneRecord → QuestionResponse**: 1対多
4. **OneOnOneRecord → GoalResponse**: 1対多
5. **OneOnOneRecord → FreeFormatSection**: 1対多
6. **OneOnOneRecord → SecretMemo**: 1対多
7. **CommonQuestion → QuestionResponse**: 1対多
8. **Goal → GoalResponse**: 1対多

### 制約・インデックス
- User.role は 'admin', 'mentor', 'member' のいずれか
- OneOnOneRecord.status は 'pending', 'scheduled', 'completed' のいずれか
- GoalResponse.progress_percent は 0-100 の範囲
- 各テーブルに created_at, updated_at のインデックス
- 外部キー制約の設定