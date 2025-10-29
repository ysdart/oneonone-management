import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/AppLayout/AppLayout'
import Login from '../pages/Login/Login'
import Top from '../pages/Top/Top'
import Records from '../pages/Records/Records'
import RecordDetail from '../pages/RecordDetail/RecordDetail'
import RecordEdit from '../pages/RecordEdit/RecordEdit'
import RecordCreate from '../pages/RecordCreate/RecordCreate'
import Questions from '../pages/Questions/Questions'
import NotFound from '../pages/NotFound/NotFound'

function AppRoutes() {
  return (
    <Routes>
      {/* 認証 */}
      <Route path="/login" element={<Login />} />

      {/* TOP画面 */}
      <Route path="/" element={<AppLayout><Top /></AppLayout>} />
      <Route path="/top" element={<AppLayout><Top /></AppLayout>} />

      {/* 記録一覧・詳細・編集・新規 */}
      <Route path="/records" element={<AppLayout><Records /></AppLayout>} />
      <Route path="/records/:id" element={<AppLayout><RecordDetail /></AppLayout>} />
      <Route path="/records/:id/edit" element={<AppLayout><RecordEdit /></AppLayout>} />
      <Route path="/records/create" element={<AppLayout><RecordCreate /></AppLayout>} />

      {/* 管理（確認事項管理） */}
      <Route path="/questions" element={<AppLayout><Questions /></AppLayout>} />

      <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
    </Routes>
  )
}

export default AppRoutes

