import { useState } from 'react'
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Box,
  Chip,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'

export interface FilterState {
  name: string
  department: string
  status: string
  mentor: string
  month: string
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterState) => void
  onSearch: (filters: FilterState) => void
  onClear: () => void
}

const departments = [
  '開発部',
  '営業部',
  'マーケティング部',
  '人事部',
  '経理部',
  '総務部'
]

const statuses = [
  '未実施',
  '完了',
  '予定済み',
  '調整中'
]

const mentors = [
  '田中太郎',
  '佐藤花子',
  '鈴木一郎',
  '高橋美咲'
]

// 現在の月を取得してデフォルト値として設定
const getCurrentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月`
}

const months = [
  '2024年1月',
  '2024年2月',
  '2024年3月',
  '2024年4月',
  '2024年5月',
  '2024年6月',
  '2024年7月',
  '2024年8月',
  '2024年9月',
  '2024年10月',
  '2024年11月',
  '2024年12月'
]

export default function SearchFilter({ onFilterChange, onSearch, onClear }: SearchFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    name: '',
    department: '',
    status: '',
    mentor: '',
    month: getCurrentMonth() // デフォルト値を今月に設定
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
    
    // アクティブフィルターの更新
    const newActiveFilters = Object.entries(newFilters)
      .filter(([_, val]) => val !== '')
      .map(([key, _]) => key)
    setActiveFilters(newActiveFilters)
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClear = () => {
    const clearedFilters = {
      name: '',
      department: '',
      status: '',
      mentor: '',
      month: getCurrentMonth() // クリア時も今月をデフォルトに
    }
    setFilters(clearedFilters)
    setActiveFilters([])
    onClear()
  }

  const removeFilter = (filterKey: string) => {
    const newFilters = { ...filters, [filterKey]: '' }
    setFilters(newFilters)
    onFilterChange(newFilters)
    
    const newActiveFilters = activeFilters.filter(key => key !== filterKey)
    setActiveFilters(newActiveFilters)
  }

  const getFilterLabel = (key: string) => {
    const labels: Record<string, string> = {
      name: '氏名',
      department: '部署',
      status: 'ステータス',
      mentor: '担当メンター',
      month: '月'
    }
    return labels[key] || key
  }

  const getFilterValue = (key: string) => {
    const value = filters[key as keyof FilterState]
    if (key === 'department') return departments.find(d => d === value) || ''
    if (key === 'status') return statuses.find(s => s === value) || ''
    if (key === 'mentor') return mentors.find(m => m === value) || ''
    if (key === 'month') return months.find(m => m === value) || ''
    return value
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={3}>
          {/* 検索バー */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              fullWidth
              placeholder="メンバー名で検索..."
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{ minWidth: 100 }}
            >
              検索
            </Button>
          </Stack>

          {/* フィルター */}
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              フィルター条件
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>部署</InputLabel>
                <Select
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  label="部署"
                >
                  <MenuItem value="">すべて</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>ステータス</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  label="ステータス"
                >
                  <MenuItem value="">すべて</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>担当メンター</InputLabel>
                <Select
                  value={filters.mentor}
                  onChange={(e) => handleFilterChange('mentor', e.target.value)}
                  label="担当メンター"
                >
                  <MenuItem value="">すべて</MenuItem>
                  {mentors.map((mentor) => (
                    <MenuItem key={mentor} value={mentor}>
                      {mentor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>月 *</InputLabel>
                <Select
                  value={filters.month}
                  onChange={(e) => handleFilterChange('month', e.target.value)}
                  label="月 *"
                  required
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={handleClear}
                startIcon={<ClearIcon />}
              >
                クリア
              </Button>
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<FilterListIcon />}
              >
                フィルター適用
              </Button>
            </Stack>
          </Stack>

          {/* アクティブフィルター表示 */}
          {activeFilters.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                適用中のフィルター:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {activeFilters.map((filterKey) => (
                  <Chip
                    key={filterKey}
                    label={`${getFilterLabel(filterKey)}: ${getFilterValue(filterKey)}`}
                    onDelete={() => removeFilter(filterKey)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
