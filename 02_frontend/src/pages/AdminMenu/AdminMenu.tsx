import { Link } from 'react-router-dom'

function AdminMenu() {
  return (
    <div>
      <h2>管理者メニュー</h2>
      <div style={{ marginBottom: 20 }}>
        <Link to="/top" style={{ color: '#646cff' }}>← TOPに戻る</Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        <Link 
          to="/admin/schedule"
          style={{ 
            display: 'block',
            padding: 20, 
            backgroundColor: '#f8f9fa', 
            color: '#333', 
            textDecoration: 'none',
            borderRadius: 8,
            border: '1px solid #ddd'
          }}
        >
          <h3>報告会日程管理</h3>
          <p>1on1の日程を設定・管理します</p>
        </Link>
        
        <Link 
          to="/admin/questions"
          style={{ 
            display: 'block',
            padding: 20, 
            backgroundColor: '#f8f9fa', 
            color: '#333', 
            textDecoration: 'none',
            borderRadius: 8,
            border: '1px solid #ddd'
          }}
        >
          <h3>確認事項管理</h3>
          <p>共通の確認事項を設定します</p>
        </Link>
        
        <Link 
          to="/admin/users"
          style={{ 
            display: 'block',
            padding: 20, 
            backgroundColor: '#f8f9fa', 
            color: '#333', 
            textDecoration: 'none',
            borderRadius: 8,
            border: '1px solid #ddd'
          }}
        >
          <h3>ユーザー管理</h3>
          <p>ユーザーの権限と担当を管理します</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminMenu
