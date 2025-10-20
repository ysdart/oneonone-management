import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// 仮のメンバーデータ
const memberData = {
  1: { name: '田中太郎', department: '開発部', status: 'アクティブ' },
  2: { name: '佐藤花子', department: '営業部', status: 'アクティブ' },
  3: { name: '鈴木一郎', department: 'マーケティング部', status: '休職中' },
}

function MemberEdit() {
  const { id } = useParams<{ id: string }>()
  const member = memberData[parseInt(id || '0')]
  
  const [oneOnOneContent, setOneOnOneContent] = useState('')
  const [evaluation, setEvaluation] = useState('')
  const [goals, setGoals] = useState('')

  if (!member) {
    return (
      <div>
        <h2>メンバーが見つかりません</h2>
        <Link to="/members">← メンバー一覧に戻る</Link>
      </div>
    )
  }

  const handleSave = () => {
    // 保存処理（実際の実装は後で）
    alert('保存しました')
  }

  return (
    <div>
      <h2>メンバー詳細（編集）</h2>
      <div style={{ marginBottom: 20 }}>
        <Link to={`/members/${id}`} style={{ color: '#646cff' }}>← 詳細に戻る</Link>
      </div>
      
      <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 4 }}>
        <h3>{member.name} の編集</h3>
        
        <div style={{ marginBottom: 20 }}>
          <label>
            <strong>1on1記録（Markdown）:</strong>
            <textarea
              value={oneOnOneContent}
              onChange={(e) => setOneOnOneContent(e.target.value)}
              style={{ width: '100%', height: 150, padding: 8, marginTop: 4 }}
              placeholder="1on1の内容をMarkdownで記録してください"
            />
          </label>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label>
            <strong>評価（1-10）:</strong>
            <input
              type="number"
              min="1"
              max="10"
              value={evaluation}
              onChange={(e) => setEvaluation(e.target.value)}
              style={{ width: 100, padding: 8, marginTop: 4, marginLeft: 8 }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label>
            <strong>目標管理:</strong>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              style={{ width: '100%', height: 100, padding: 8, marginTop: 4 }}
              placeholder="目標と進捗を記録してください"
            />
          </label>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={handleSave}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none',
              borderRadius: 4
            }}
          >
            保存
          </button>
          <Link 
            to={`/members/${id}`}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: 4
            }}
          >
            キャンセル
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MemberEdit
