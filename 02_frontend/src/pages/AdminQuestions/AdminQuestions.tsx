import { Link } from 'react-router-dom'

function AdminQuestions() {
  return (
    <div>
      <h2>確認事項管理</h2>
      <div style={{ marginBottom: 20 }}>
        <Link to="/admin" style={{ color: '#646cff' }}>← 管理者メニューに戻る</Link>
      </div>
      
      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 4 }}>
        <h3>共通確認事項の設定</h3>
        <p>（ここに確認事項管理の機能が実装されます）</p>
        <ul>
          <li>共通質問項目の追加・編集・削除</li>
          <li>質問の優先順位設定</li>
          <li>回答形式の設定（テキスト・数値・選択肢）</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminQuestions
