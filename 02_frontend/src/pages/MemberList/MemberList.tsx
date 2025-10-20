import { Link } from 'react-router-dom'

// 仮のメンバーデータ
const members = [
  { id: 1, name: '田中太郎', department: '開発部', status: 'アクティブ' },
  { id: 2, name: '佐藤花子', department: '営業部', status: 'アクティブ' },
  { id: 3, name: '鈴木一郎', department: 'マーケティング部', status: '休職中' },
]

function MemberList() {
  return (
    <div>
      <h2>メンバー一覧</h2>
      <div style={{ marginBottom: 20 }}>
        <Link to="/top" style={{ color: '#646cff' }}>← TOPに戻る</Link>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {members.map((member) => (
          <div 
            key={member.id}
            style={{ 
              border: '1px solid #ddd', 
              padding: 16, 
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3>{member.name}</h3>
              <p>{member.department} - {member.status}</p>
            </div>
            <div>
              <Link 
                to={`/members/${member.id}`}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#646cff', 
                  color: 'white', 
                  textDecoration: 'none',
                  borderRadius: 4,
                  marginRight: 8
                }}
              >
                詳細
              </Link>
              <Link 
                to={`/members/${member.id}/edit`}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  textDecoration: 'none',
                  borderRadius: 4
                }}
              >
                編集
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MemberList
