export async function fetchGreeting(): Promise<string> {
  // デモ用の擬似API
  await new Promise((r) => setTimeout(r, 200))
  return 'こんにちは！擬似APIからのメッセージです。'
}

export interface Member {
  id: number
  name: string
  department: string
  status: 'completed' | 'planned' | 'pending' | 'overdue'
  scheduledDate?: string
  mentor: string
  lastUpdated: string
}

export interface FetchMembersParams {
  month: string // "2024年1月" 形式
  mentor?: string
}

export async function fetchMembers(params: FetchMembersParams): Promise<Member[]> {
  // モックAPI: 実際のAPI呼び出しをシミュレート
  await new Promise((r) => setTimeout(r, 500))
  
  // モックデータ
  const mockMembers: Member[] = [
    // 2024年1月データ
    {
      id: 1,
      name: '田中太郎',
      department: '開発部',
      status: 'completed',
      scheduledDate: '2024-01-15',
      mentor: '佐藤花子',
      lastUpdated: '2024-01-10',
    },
    {
      id: 2,
      name: '佐藤花子',
      department: '営業部',
      status: 'planned',
      scheduledDate: '2024-01-20',
      mentor: '鈴木一郎',
      lastUpdated: '2024-01-08',
    },
    {
      id: 3,
      name: '鈴木一郎',
      department: 'マーケティング部',
      status: 'pending',
      mentor: '高橋美咲',
      lastUpdated: '2024-01-05',
    },
    {
      id: 4,
      name: '高橋美咲',
      department: '人事部',
      status: 'pending',
      scheduledDate: '2024-01-05',
      mentor: '田中太郎',
      lastUpdated: '2024-01-03',
    },
    {
      id: 5,
      name: '山田次郎',
      department: '開発部',
      status: 'completed',
      scheduledDate: '2024-01-12',
      mentor: '佐藤花子',
      lastUpdated: '2024-01-11',
    },

    // 2024年11月データ（追加分）
    {
      id: 101,
      name: '田中太郎',
      department: '開発部',
      status: 'planned',
      scheduledDate: '2025-11-10',
      mentor: '佐藤花子',
      lastUpdated: '2025-11-03',
    },
    {
      id: 102,
      name: '佐藤花子',
      department: '営業部',
      status: 'pending',
      scheduledDate: '2025-11-12',
      mentor: '鈴木一郎',
      lastUpdated: '2025-11-05',
    },
    {
      id: 103,
      name: '鈴木一郎',
      department: 'マーケティング部',
      status: 'planned',
      scheduledDate: '2025-11-15',
      mentor: '高橋美咲',
      lastUpdated: '2025-11-11',
    },
    {
      id: 104,
      name: '高橋美咲',
      department: '人事部',
      status: 'planned',
      scheduledDate: '2025-11-18',
      mentor: '田中太郎',
      lastUpdated: '2025-11-13',
    },
    {
      id: 105,
      name: '山田次郎',
      department: '開発部',
      status: 'planned',
      scheduledDate: '2025-11-22',
      mentor: '佐藤花子',
      lastUpdated: '2025-11-21',
    },

    // 2025年10月データ（追加分）
    {
      id: 11,
      name: '田中太郎',
      department: '開発部',
      status: 'planned',
      scheduledDate: '2025-10-10',
      mentor: '佐藤花子',
      lastUpdated: '2025-10-05',
    },
    {
      id: 12,
      name: '佐藤花子',
      department: '営業部',
      status: 'pending',
      scheduledDate: '2025-10-15',
      mentor: '鈴木一郎',
      lastUpdated: '2025-10-10',
    },
    {
      id: 13,
      name: '鈴木一郎',
      department: 'マーケティング部',
      status: 'completed',
      scheduledDate: '2025-10-08',
      mentor: '高橋美咲',
      lastUpdated: '2025-10-08',
    },
    {
      id: 14,
      name: '高橋美咲',
      department: '人事部',
      status: 'planned',
      scheduledDate: '2025-10-20',
      mentor: '田中太郎',
      lastUpdated: '2025-10-13',
    },
    {
      id: 15,
      name: '山田次郎',
      department: '開発部',
      status: 'completed',
      scheduledDate: '2025-10-15',
      mentor: '佐藤花子',
      lastUpdated: '2025-10-16',
    },
  ]

  // 月でフィルタリング
  let filtered = mockMembers.filter(member => {
    if (!member.scheduledDate) return false
    const memberDate = new Date(member.scheduledDate)
    const filterMonth = params.month.replace('年', '-').replace('月', '')
    const memberMonth = `${memberDate.getFullYear()}-${String(memberDate.getMonth() + 1).padStart(2, '0')}`
    return memberMonth === filterMonth
  })

  // メンターでフィルタリング
  if (params.mentor) {
    filtered = filtered.filter(member => member.mentor === params.mentor)
  }

  return filtered
}


