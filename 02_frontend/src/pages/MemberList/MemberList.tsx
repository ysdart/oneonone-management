import { useState, useEffect } from 'react'
import { Container, Stack } from '@mui/material'
import PageHeader from '../../components/PageHeader/PageHeader'
import FilteredMembersStatus from '../../components/FilteredMembersStatus/FilteredMembersStatus'
import SearchFilter, { type FilterState } from '../../components/SearchFilter/SearchFilter'
import MemberListComponent, { type Member } from '../../components/MemberList/MemberList'
import PeopleIcon from '@mui/icons-material/People'

// 仮のメンバーデータ
const mockMembers: Member[] = [
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
    status: 'overdue',
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
]

function MemberList() {
  // ステート定義
  const [members] = useState<Member[]>(mockMembers)
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(mockMembers)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState<FilterState>({
    name: '',
    department: '',
    status: '',
    mentor: '',
    month: ''
  })

  // 現在の月を取得する関数
  const getCurrentMonth = () => {
    const now = new Date()
    return `${now.getFullYear()}年${now.getMonth() + 1}月`
  }

  // フィルタ適用ロジック
  const applyFilters = (filterState: FilterState) => {
    let filtered = [...members]

    if (filterState.name) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(filterState.name.toLowerCase())
      )
    }

    if (filterState.department) {
      filtered = filtered.filter(member => 
        member.department === filterState.department
      )
    }

    if (filterState.status) {
      const statusMap: Record<string, Member['status']> = {
        '未実施': 'pending',
        '完了': 'completed',
        '予定済み': 'planned'
      }
      const statusValue = statusMap[filterState.status]
      if (statusValue) {
        filtered = filtered.filter(member => member.status === statusValue)
      }
    }

    if (filterState.mentor) {
      filtered = filtered.filter(member => 
        member.mentor === filterState.mentor
      )
    }

    if (filterState.month) {
      filtered = filtered.filter(member => {
        if (!member.scheduledDate) return false
        const memberDate = new Date(member.scheduledDate)
        const filterMonth = filterState.month.replace('年', '-').replace('月', '')
        const memberMonth = `${memberDate.getFullYear()}-${String(memberDate.getMonth() + 1).padStart(2, '0')}`
        return memberMonth === filterMonth
      })
    }

    setFilteredMembers(filtered)
    setPage(0)
  }

  // フィルター入力の更新
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  // 検索ボタン押下時
  const handleSearch = (searchFilters: FilterState) => {
    applyFilters(searchFilters)
  }

  // クリアボタン押下時
  const handleClear = () => {
    const clearedFilters = {
      name: '',
      department: '',
      status: '',
      mentor: '',
      month: getCurrentMonth()
    }
    setFilters(clearedFilters)
    setFilteredMembers(members)
    setPage(0)
  }

  // 統計値算出
  const getFilteredStats = (members: Member[]) => {
    return {
      completed: members.filter(m => m.status === 'completed').length,
      planned: members.filter(m => m.status === 'planned').length,
      pending: members.filter(m => m.status === 'pending').length,
    }
  }

  // ページネーションの更新
  const handlePageChange = (newPage: number, newRowsPerPage: number) => {
    setPage(newPage)
    setRowsPerPage(newRowsPerPage)
  }

  // 初回マウント・members更新時 フィルター適用
  useEffect(() => {
    applyFilters(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members])

  // 表示データのページネーション適用
  const paginatedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        {/* ページタイトル */}
        <PageHeader
          icon={<PeopleIcon />}
          title="メンバー一覧"
          description="担当メンバーの1on1実施状況を確認・管理できます"
        />

        {/* フィルター適用後の実施状況 */}
        <FilteredMembersStatus
          filteredData={getFilteredStats(filteredMembers)}
        />

        {/* 検索・フィルタUI */}
        <SearchFilter
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {/* メンバーリスト 本体 */}
        <MemberListComponent
          members={paginatedMembers}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={filteredMembers.length}
        />
      </Stack>
    </Container>
  )
}

export default MemberList
