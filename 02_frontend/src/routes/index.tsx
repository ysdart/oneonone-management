import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/AppLayout/AppLayout'
import Login from '../pages/Login/Login'
import Sample from '../pages/Sample/Sample'
import Top from '../pages/Top/Top'
import MemberList from '../pages/MemberList/MemberList'
import MemberDetail from '../pages/MemberDetail/MemberDetail'
import MemberEdit from '../pages/MemberEdit/MemberEdit'
import AdminMenu from '../pages/AdminMenu/AdminMenu'
import AdminSchedule from '../pages/AdminSchedule/AdminSchedule'
import AdminQuestions from '../pages/AdminQuestions/AdminQuestions'
import AdminUsers from '../pages/AdminUsers/AdminUsers'
import NotFound from '../pages/NotFound/NotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout><Top /></AppLayout>} />
      <Route path="/top" element={<AppLayout><Top /></AppLayout>} />
      <Route path="/members" element={<AppLayout><MemberList /></AppLayout>} />
      <Route path="/members/:id" element={<AppLayout><MemberDetail /></AppLayout>} />
      <Route path="/members/:id/edit" element={<AppLayout><MemberEdit /></AppLayout>} />
      <Route path="/admin" element={<AppLayout><AdminMenu /></AppLayout>} />
      <Route path="/admin/schedule" element={<AppLayout><AdminSchedule /></AppLayout>} />
      <Route path="/admin/questions" element={<AppLayout><AdminQuestions /></AppLayout>} />
      <Route path="/admin/users" element={<AppLayout><AdminUsers /></AppLayout>} />
      <Route path="/sample" element={<AppLayout><Sample /></AppLayout>} />
      <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
    </Routes>
  )
}

export default AppRoutes


