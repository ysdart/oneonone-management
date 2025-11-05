export type AnswerType = 'text' | 'number' | 'select'

export interface QuestionOption {
  id: number
  label: string
}

export interface Question {
  id: number
  text: string
  startPeriod: string // 例: '2024年10月'
  endPeriod: string | null // 例: '2024年12月' または null（未定）
  order: number
  answerType: AnswerType
  options?: QuestionOption[]
}

export interface QuestionFormInput {
  id?: number
  text: string
  startPeriod: string
  endPeriod: string | null
  answerType: AnswerType
  options?: string[]
}

export const PERIODS = [
  '2024年1月','2024年2月','2024年3月','2024年4月','2024年5月','2024年6月',
  '2024年7月','2024年8月','2024年9月','2024年10月','2024年11月','2024年12月',
  '2025年1月','2025年2月','2025年3月','2025年4月','2025年5月','2025年6月',
]

export function generateMockQuestions(): Question[] {
  const base: Omit<Question, 'id' | 'order'>[] = [
    { text: '今月の達成事項を教えてください', startPeriod: '2024年10月', endPeriod: '2024年12月', answerType: 'text' },
    { text: '困っていることはありますか？', startPeriod: '2024年10月', endPeriod: null, answerType: 'text' },
    { text: '業務満足度（1-5）', startPeriod: '2024年10月', endPeriod: '2024年12月', answerType: 'number' },
    { text: '次月の注力分野を選択', startPeriod: '2024年10月', endPeriod: null, answerType: 'select' },
  ]
  return base.map((b, idx) => ({
    id: idx + 1,
    text: b.text,
    startPeriod: b.startPeriod,
    endPeriod: b.endPeriod,
    order: idx + 1,
    answerType: b.answerType,
    options: b.answerType === 'select' ? [
      { id: 1, label: '品質' }, { id: 2, label: '速度' }, { id: 3, label: '学習' }
    ] : undefined,
  }))
}

export function createEmptyQuestion(existing: Question[]): Question {
  const nextId = (existing.reduce((m, q) => Math.max(m, q.id), 0) || 0) + 1
  const nextOrder = (existing.reduce((m, q) => Math.max(m, q.order), 0) || 0) + 1
  return {
    id: nextId,
    text: '',
    startPeriod: PERIODS[0],
    endPeriod: null,
    order: nextOrder,
    answerType: 'text',
    options: undefined,
  }
}

export function upsertQuestion(list: Question[], input: QuestionFormInput): Question[] {
  const isEdit = typeof input.id === 'number'
  if (isEdit) {
    return list.map(q => q.id === input.id ? {
      ...q,
      text: input.text,
      startPeriod: input.startPeriod,
      endPeriod: input.endPeriod,
      answerType: input.answerType,
      options: input.answerType === 'select' ? (input.options || []).map((label, idx) => ({ id: idx + 1, label })) : undefined,
    } : q)
  } else {
    const nextId = (list.reduce((m, q) => Math.max(m, q.id), 0) || 0) + 1
    const nextOrder = (list.reduce((m, q) => Math.max(m, q.order), 0) || 0) + 1
    const created: Question = {
      id: nextId,
      text: input.text,
      startPeriod: input.startPeriod,
      endPeriod: input.endPeriod,
      order: nextOrder,
      answerType: input.answerType,
      options: input.answerType === 'select' ? (input.options || []).map((label, idx) => ({ id: idx + 1, label })) : undefined,
    }
    return [...list, created]
  }
}

export function deleteQuestion(list: Question[], id: number): Question[] {
  const filtered = list.filter(q => q.id !== id)
  // order を詰め直す
  return filtered
    .sort((a, b) => a.order - b.order)
    .map((q, idx) => ({ ...q, order: idx + 1 }))
}

export function reorderQuestions(list: Question[], sourceIndex: number, destinationIndex: number): Question[] {
  if (destinationIndex < 0 || destinationIndex >= list.length) return list
  const sorted = [...list].sort((a, b) => a.order - b.order)
  const [moved] = sorted.splice(sourceIndex, 1)
  sorted.splice(destinationIndex, 0, moved)
  return sorted.map((q, idx) => ({ ...q, order: idx + 1 }))
}

