import { useState } from 'react'
import { Card, CardContent, FormControl, Stack, Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { type Dayjs } from 'dayjs'
import 'dayjs/locale/ja'

export interface QuestionFilterState {
  period: string
}

interface Props {
  onFilterChange: (filters: QuestionFilterState) => void
  onClear: () => void
}

// Dayjsオブジェクトを文字列形式（"2024年1月"）に変換
const formatMonthString = (date: Dayjs | null): string => {
  if (!date) return ''
  return `${date.year()}年${date.month() + 1}月`
}

export default function SearchFilter({ onFilterChange, onClear }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null)

  const handleChange = (newDate: Dayjs | null) => {
    setSelectedMonth(newDate)
    const periodString = formatMonthString(newDate)
    const next = { period: periodString }
    onFilterChange(next)
  }

  const handleClear = () => {
    setSelectedMonth(null)
    onClear()
  }

  return (
    <Card>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'flex-end' }}>
          <FormControl sx={{ width: '400px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              <DatePicker
                label="適用期間"
                value={selectedMonth}
                onChange={handleChange}
                views={['year', 'month']}
                format="YYYY年M月"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleClear} startIcon={<ClearIcon />}>クリア</Button>
            <Button variant="contained" startIcon={<FilterListIcon />}>フィルター適用</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}


