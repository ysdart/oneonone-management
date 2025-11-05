import { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField, FormControl, Chip, FormHelperText, FormControlLabel, Checkbox, InputLabel, Select, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { type Dayjs } from 'dayjs'
import 'dayjs/locale/ja'
import { type AnswerType, type Question, type QuestionFormInput } from './types'

interface Props {
  open: boolean
  initial?: Question
  onClose: () => void
  onSubmit: (input: QuestionFormInput) => void
}

export default function QuestionForm({ open, initial, onClose, onSubmit }: Props) {
  const [text, setText] = useState('')
  const [startPeriod, setStartPeriod] = useState('')
  const [endPeriod, setEndPeriod] = useState<string | null>(null)
  const [answerType, setAnswerType] = useState<AnswerType>('text')
  const [options, setOptions] = useState<string>('')

  // DatePicker 表示用の状態（年月）
  const [selectedStartMonth, setSelectedStartMonth] = useState<Dayjs | null>(null)
  const [selectedEndMonth, setSelectedEndMonth] = useState<Dayjs | null>(null)
  const [endIndefinite, setEndIndefinite] = useState<boolean>(true)

  // "2024年10月" ⇔ Dayjs 変換
  const parseMonthString = (monthString: string): Dayjs | null => {
    const match = monthString.match(/(\d{4})年(\d{1,2})月/)
    if (match) {
      const year = parseInt(match[1], 10)
      const month = parseInt(match[2], 10) - 1
      return dayjs(new Date(year, month, 1))
    }
    return null
  }

  const formatMonthString = (date: Dayjs | null): string => {
    if (!date) return ''
    return `${date.year()}年${date.month() + 1}月`
  }

  useEffect(() => {
    if (!open) return
    if (initial) {
      setText(initial.text)
      setStartPeriod(initial.startPeriod)
      setEndPeriod(initial.endPeriod)
      setAnswerType(initial.answerType)
      setOptions((initial.options || []).map(o => o.label).join('\n'))
      // Picker 初期化
      const s = parseMonthString(initial.startPeriod)
      setSelectedStartMonth(s)
      if (initial.endPeriod) {
        const e = parseMonthString(initial.endPeriod)
        setSelectedEndMonth(e)
        setEndIndefinite(false)
      } else {
        setSelectedEndMonth(null)
        setEndIndefinite(true)
      }
    } else {
      setText('')
      setStartPeriod('')
      setEndPeriod(null)
      setAnswerType('text')
      setOptions('')
      setSelectedStartMonth(null)
      setSelectedEndMonth(null)
      setEndIndefinite(true)
    }
  }, [open, initial])

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!text.trim()) e.text = '質問文は必須です'
    if (!startPeriod) e.startPeriod = '開始期間は必須です'
    if (answerType === 'select') {
      const lines = options.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
      if (lines.length === 0) e.options = '選択肢を1件以上入力してください'
    }
    return e
  }, [text, startPeriod, answerType, options])

  const handleSubmit = () => {
    if (Object.keys(errors).length > 0) return
    const input: QuestionFormInput = {
      id: initial?.id,
      text: text.trim(),
      startPeriod,
      endPeriod: endPeriod === '' ? null : endPeriod,
      answerType,
      options: answerType === 'select' ? options.split(/\r?\n/).map(l => l.trim()).filter(Boolean) : undefined,
    }
    onSubmit(input)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? '確認事項を編集' : '確認事項を追加'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="質問文 *"
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={!!errors.text}
            helperText={errors.text}
            fullWidth
            multiline
            minRows={2}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
            <FormControl fullWidth required error={!!errors.startPeriod}>
              <DatePicker
                label="開始（年月）*"
                value={selectedStartMonth}
                onChange={(newDate) => {
                  setSelectedStartMonth(newDate)
                  const s = formatMonthString(newDate)
                  setStartPeriod(s)
                }}
                views={['year', 'month']}
                format="YYYY年M月"
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true,
                    error: !!errors.startPeriod,
                    helperText: errors.startPeriod,
                  },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={endIndefinite}
                    onChange={(e) => {
                      const checked = e.target.checked
                      setEndIndefinite(checked)
                      if (checked) {
                        setSelectedEndMonth(null)
                        setEndPeriod(null)
                      }
                    }}
                  />
                }
                label="終了未定"
              />
              <DatePicker
                label="終了（年月）"
                value={selectedEndMonth}
                onChange={(newDate) => {
                  setSelectedEndMonth(newDate)
                  const e = formatMonthString(newDate)
                  setEndPeriod(e || null)
                  setEndIndefinite(!newDate)
                }}
                views={['year', 'month']}
                format="YYYY年M月"
                disabled={endIndefinite}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </FormControl>
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel>回答形式</InputLabel>
            <Select
              label="回答形式"
              value={answerType}
              onChange={(e: SelectChangeEvent) => setAnswerType(e.target.value as AnswerType)}
            >
              <MenuItem value="text">text</MenuItem>
              <MenuItem value="number">number</MenuItem>
              <MenuItem value="select">select</MenuItem>
            </Select>
          </FormControl>

          {answerType === 'select' && (
            <TextField
              label="選択肢（1行1件）*"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              error={!!errors.options}
              helperText={errors.options || '改行で複数行入力できます'}
              fullWidth
              multiline
              minRows={3}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={Object.keys(errors).length > 0}>
          {initial ? '更新する' : '追加する'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}


