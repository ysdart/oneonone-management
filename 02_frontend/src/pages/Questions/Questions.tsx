import { useMemo, useState } from 'react'
import { Container, Stack, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import PageHeader from '../../components/PageHeader/PageHeader'
import SearchFilter, { type QuestionFilterState } from './SearchFilter.tsx'
import QuestionList from './QuestionList.tsx'
import QuestionForm from './QuestionForm.tsx'
import { type Question, type QuestionFormInput, createEmptyQuestion, generateMockQuestions, upsertQuestion, deleteQuestion as deleteQuestionUtil, reorderQuestions } from './types.ts'

function Questions() {
  const [questions, setQuestions] = useState<Question[]>(() => generateMockQuestions())
  const [filters, setFilters] = useState<QuestionFilterState>({ period: '' })
  const [editing, setEditing] = useState<{ open: boolean; initial?: Question }>(() => ({ open: false }))

  const filtered = useMemo(() => {
    if (!filters.period) return questions
    return questions.filter(q => q.startPeriod === filters.period)
  }, [questions, filters])

  const handleOpenAdd = () => {
    setEditing({ open: true, initial: createEmptyQuestion(questions) })
  }

  const handleOpenEdit = (q: Question) => {
    setEditing({ open: true, initial: q })
  }

  const handleCloseForm = () => {
    setEditing({ open: false })
  }

  const handleSubmit = (input: QuestionFormInput) => {
    setQuestions(prev => upsertQuestion(prev, input))
    setEditing({ open: false })
  }

  const handleDelete = (id: number) => {
    setQuestions(prev => deleteQuestionUtil(prev, id))
  }

  const handleReorder = (sourceIndex: number, destinationIndex: number) => {
    setQuestions(prev => reorderQuestions(prev, sourceIndex, destinationIndex))
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <PageHeader
          icon={<SettingsIcon />}
          title="確認事項管理"
          description="共通質問（確認事項）の一覧・追加・編集・削除・表示順の管理を行います"
        />

        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
            確認事項を追加
          </Button>
        </Stack>

        <SearchFilter
          onFilterChange={setFilters}
          onClear={() => setFilters({ period: '' })}
        />

        <QuestionList
          questions={filtered}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onReorder={handleReorder}
        />

        <QuestionForm
          open={editing.open}
          initial={editing.initial}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Container>
  )
}

export default Questions
