import { useState, useEffect } from 'react'
import { Box, Stack, CircularProgress } from '@mui/material'
import PageHeader from '../../components/PageHeader/PageHeader'
import FilteredMembersStatus from './FilteredMembersStatus'
import SearchFilter, { type FilterState } from './SearchFilter'
import MemberListComponent, { type Member } from './MemberList'
import PeopleIcon from '@mui/icons-material/People'
import { fetchMembers } from '../../lib/apiClient'

// 現在の月を取得する関数
const getCurrentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月`
}

function Records() {
  // ステート定義
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    month: getCurrentMonth(),
    mentor: ''
  })

  // APIからメンバー情報を取得
  const loadMembers = async (filterState: FilterState) => {
    setLoading(true)
    try {
      const data = await fetchMembers({
        month: filterState.month,
        mentor: filterState.mentor || undefined
      })
      setFilteredMembers(data)
      setPage(0)
    } catch (error) {
      console.error('メンバー情報の取得に失敗しました:', error)
      setFilteredMembers([])
    } finally {
      setLoading(false)
    }
  }

  // フィルタ適用ロジック（API呼び出し）
  const applyFilters = (filterState: FilterState) => {
    loadMembers(filterState)
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
      month: getCurrentMonth(),
      mentor: ''
    }
    setFilters(clearedFilters)
    applyFilters(clearedFilters)
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

  // 初回マウント時に現在の月でデータ取得
  useEffect(() => {
    applyFilters(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 表示データのページネーション適用
  const paginatedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, mx: 0, maxWidth: '100%' }}>
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
          initialFilters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {/* ローディング表示 */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        ) : (
          /* メンバーリスト 本体 */
          <MemberListComponent
            members={paginatedMembers}
            onPageChange={handlePageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={filteredMembers.length}
          />
        )}
      </Stack>
    </Box>
  )
}

export default Records
