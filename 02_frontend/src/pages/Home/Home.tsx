import { useMemo } from 'react'
import { formatDate } from '../../utils/format'

function Home() {
  const today = useMemo(() => formatDate(new Date()), [])
  return (
    <div>
      <h2>Home</h2>
      <p>ここはホーム画面です。今日の日付: {today}</p>
    </div>
  )
}

export default Home


