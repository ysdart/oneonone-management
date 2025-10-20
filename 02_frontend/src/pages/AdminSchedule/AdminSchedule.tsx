import { Link } from 'react-router-dom'

function AdminSchedule() {
  return (
    <div>
      <h2>報告会日程管理</h2>
      <div style={{ marginBottom: 20 }}>
        <Link to="/admin" style={{ color: '#646cff' }}>← 管理者メニューに戻る</Link>
      </div>
      
      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 4 }}>
        <h3>日程設定</h3>
        <p>（ここに日程管理の機能が実装されます）</p>
        <ul>
          <li>定期的な1on1のスケジュール設定</li>
          <li>臨時の1on1日程追加</li>
          <li>休暇・調整期間の設定</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSchedule
