import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Box,
  Chip,
  Typography,
  styled
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { type Dayjs } from 'dayjs'
import 'dayjs/locale/ja'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'

// 年・月選択ボタンのスタイル修正
const StyledDatePicker = styled(DatePicker)({
  '& .MuiYearCalendar-button': {
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    verticalAlign: 'middle !important',
    lineHeight: '1.5 !important',
    padding: '9.6px 19.2px !important',
  },
  '& .MuiMonthCalendar-button': {
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    verticalAlign: 'middle !important',
    lineHeight: '1.5 !important',
  },
})

export interface FilterState {
  month: string
  mentor: string
}

interface SearchFilterProps {
  initialFilters?: FilterState
  onFilterChange: (filters: FilterState) => void
  onSearch: (filters: FilterState) => void
  onClear: () => void
}

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

// 文字列形式（"2024年1月"）をDayjsオブジェクトに変換
const parseMonthString = (monthString: string): Dayjs => {
  const match = monthString.match(/(\d{4})年(\d{1,2})月/)
  if (match) {
    const year = parseInt(match[1], 10)
    const month = parseInt(match[2], 10) - 1 // 月は0ベース
    return dayjs(new Date(year, month, 1))
  }
  return dayjs()
}

// Dayjsオブジェクトを文字列形式（"2024年1月"）に変換
const formatMonthString = (date: Dayjs | null): string => {
  if (!date) return getCurrentMonth()
  return `${date.year()}年${date.month() + 1}月`
}

export default function SearchFilter({ initialFilters, onFilterChange, onSearch, onClear }: SearchFilterProps) {
  const currentMonth = getCurrentMonth()
  const initialMonth = initialFilters?.month || currentMonth
  const [filters, setFilters] = useState<FilterState>({
    month: initialMonth, // デフォルト値を今月に設定（必須）
    mentor: initialFilters?.mentor || ''
  })
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(parseMonthString(initialMonth))

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // 親コンポーネントから渡された初期値と同期
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters)
      if (initialFilters.month) {
        setSelectedMonth(parseMonthString(initialFilters.month))
      }
    }
  }, [initialFilters])

  const handleMonthChange = (newDate: Dayjs | null) => {
    if (!newDate) return
    setSelectedMonth(newDate)
    const monthString = formatMonthString(newDate)
    const newFilters = { ...filters, month: monthString }
    setFilters(newFilters)
    onFilterChange(newFilters)
    
    // アクティブフィルターの更新
    const newActiveFilters = Object.entries(newFilters)
      .filter(([_, val]) => val !== '')
      .map(([key, _]) => key)
    setActiveFilters(newActiveFilters)
  }

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
    const currentMonthValue = getCurrentMonth()
    const clearedFilters = {
      month: currentMonthValue, // クリア時も今月をデフォルトに（必須）
      mentor: ''
    }
    setFilters(clearedFilters)
    setSelectedMonth(parseMonthString(currentMonthValue))
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
      mentor: '担当メンター',
      month: '月'
    }
    return labels[key] || key
  }

  const getFilterValue = (key: string) => {
    const value = filters[key as keyof FilterState]
    if (key === 'mentor') return mentors.find(m => m === value) || ''
    if (key === 'month') return value
    return value
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={3}>
          {/* フィルター */}
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              フィルター条件
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth required>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                  <StyledDatePicker
                    label="月 *"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    views={['year', 'month']}
                    format="YYYY年M月"
                    slotProps={{
                      textField: {
                        required: true,
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
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
