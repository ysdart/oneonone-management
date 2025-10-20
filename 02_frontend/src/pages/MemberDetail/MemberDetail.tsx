import { Link, useParams } from 'react-router-dom'

// 仮のメンバーデータ
const memberData = {
  1: { name: '田中太郎', department: '開発部', status: 'アクティブ', lastMeeting: '2024-01-15' },
  2: { name: '佐藤花子', department: '営業部', status: 'アクティブ', lastMeeting: '2024-01-10' },
  3: { name: '鈴木一郎', department: 'マーケティング部', status: '休職中', lastMeeting: '2023-12-20' },
}

function MemberDetail() {
  const { id } = useParams<{ id: string }>()
  const member = memberData[parseInt(id || '0')]

  if (!member) {
    return (
      <div>
        <h2>メンバーが見つかりません</h2>
        <Link to="/members">← メンバー一覧に戻る</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>メンバー詳細（プレビュー）</h2>
      <div style={{ marginBottom: 20 }}>
        <Link to="/members" style={{ color: '#646cff' }}>← メンバー一覧に戻る</Link>
      </div>
      
      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 4 }}>
        <h3>{member.name}</h3>
        <p><strong>部署:</strong> {member.department}</p>
        <p><strong>ステータス:</strong> {member.status}</p>
        <p><strong>最終1on1:</strong> {member.lastMeeting}</p>
        
        <div style={{ marginTop: 20 }}>
          <h4>最近の1on1記録</h4>
          <p>（ここに1on1記録のプレビューが表示されます）</p>
        </div>
        
        <div style={{ marginTop: 20 }}>
          <Link 
            to={`/members/${id}/edit`}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: 4
            }}
          >
            編集画面へ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MemberDetail
