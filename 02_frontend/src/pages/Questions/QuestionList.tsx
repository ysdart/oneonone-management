import { useRef, useState } from 'react'
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Stack, Chip, Tooltip, Paper } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { type Question } from './types'

interface Props {
  questions: Question[]
  onEdit: (q: Question) => void
  onDelete: (id: number) => void
  onReorder: (fromIndex: number, toIndex: number) => void
}

export default function QuestionList({ questions, onEdit, onDelete, onReorder }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const overIndexRef = useRef<number | null>(null)

  const sorted = [...questions].sort((a, b) => a.order - b.order)

  const handleDragStart = (index: number) => (e: React.DragEvent<HTMLTableRowElement>) => {
    setDragIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (index: number) => (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault()
    overIndexRef.current = index
  }

  const handleDrop = () => {
    if (dragIndex == null || overIndexRef.current == null) return
    if (dragIndex !== overIndexRef.current) {
      onReorder(dragIndex, overIndexRef.current)
    }
    setDragIndex(null)
    overIndexRef.current = null
  }

  const confirmDelete = (id: number) => {
    // ブラウザ標準の確認で簡易実装
    if (window.confirm('この確認事項を削除しますか？')) {
      onDelete(id)
    }
  }

  return (
    <Card>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={56} />
              <TableCell>質問文</TableCell>
              <TableCell>期間</TableCell>
              <TableCell>表示順</TableCell>
              <TableCell>回答形式</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((q, index) => (
              <TableRow key={q.id}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver(index)}
                onDrop={handleDrop}
                hover
                sx={{ cursor: 'move' }}
              >
                <TableCell width={56}>
                  <DragIndicatorIcon color={dragIndex === index ? 'primary' : 'disabled'} />
                </TableCell>
                <TableCell>{q.text}</TableCell>
                <TableCell>
                  {q.startPeriod} ～ {q.endPeriod || '未定'}
                </TableCell>
                <TableCell>{q.order}</TableCell>
                <TableCell>
                  <Chip label={q.answerType} size="small" />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Tooltip title="編集">
                      <IconButton color="primary" size="small" onClick={() => onEdit(q)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="削除">
                      <IconButton color="error" size="small" onClick={() => confirmDelete(q.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}


