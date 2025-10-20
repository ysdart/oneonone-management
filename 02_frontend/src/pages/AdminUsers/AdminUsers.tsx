import { Link } from 'react-router-dom'

function AdminUsers() {
  return (
    <div>
      <h2>ユーザー管理</h2>
      <div style={{ marginBottom: 20 }}>
        <Link to="/admin" style={{ color: '#646cff' }}>← 管理者メニューに戻る</Link>
      </div>
      
      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 4 }}>
        <h3>ユーザー権限管理</h3>
        <p>（ここにユーザー管理の機能が実装されます）</p>
        <ul>
          <li>ユーザーの追加・編集・削除</li>
          <li>権限設定（管理者・メンター・メンバー）</li>
          <li>デフォルト担当の設定</li>
          <li>月単位の臨時担当設定</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminUsers
