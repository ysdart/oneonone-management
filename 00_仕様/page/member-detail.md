## 画面名
メンバー詳細（プレビュー）画面

## ファイル名
MemberDetail.tsx

## 主な構成要素（コンポーネント）
- PageTitle
    - 画面タイトル表示
- MemberInfo
    - メンバー基本情報表示
- ScheduledDateDisplay
    - 1on1予定日表示
- MentorDisplay
    - 実施メンター表示。デフォルト値はデフォルト担当
- QuestionsAnswerView
    - 確認事項の回答閲覧
- OneOnOneViewer
    - 1on1記録のMarkdown表示、プレビュー専用
- GoalProgress
    - 目標進捗状況の閲覧
- EditButton
    - 編集画面へ遷移するボタン
- BackButton
    - メンバー一覧に戻るボタン

## 表示内容・要件
- 実施したメンターを表示できる（選択式、初期値はデフォルト担当を表示）
- メンバー基本情報（名前、部署、ステータス等）を表示
- 1on1予定日の表示
- 確認事項への回答内容を閲覧形式で表示
- 1on1記録はMarkdown形式でプレビュー表示（編集不可）
- 目標の管理・進捗状況の表示
- 編集ボタンで編集画面（MemberEdit）へ遷移
- 戻るボタンでメンバー一覧へ遷移
- スマホ・PC両対応（読みやすさ、見やすさに配慮）

## 遷移先
- メンバー詳細（編集）画面（/members/:id/edit）- 編集ボタン押下時
- メンバー一覧画面（/members）- 戻るボタン押下時
