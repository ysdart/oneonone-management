import { Box, Stack } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PageHeader from '../../components/PageHeader/PageHeader'
import MyMembersStatus from './MyMembersStatus'
import TargetMemberList from './TargetMemberList'

const demoMembers = [
  { id: 1, name: '山田 太郎', status: 'done' as const, meetingDate: '2025-10-15' },
  { id: 2, name: '佐藤 花子', status: 'planned' as const, meetingDate: '2025-10-20' },
  { id: 3, name: '鈴木 次郎', status: 'not' as const, meetingDate: undefined },
]

// デモデータ
const myMembersData = {
  completed: 1,
  planned: 2,
  pending: 3
}

const organizationData = {
  completed: 4,
  planned: 5,
  pending: 6
}


function Top() {
  return (
    <Box sx={{ p: { xs: 1, md: 3 }, mx: 0, maxWidth: '100%' }}>
      <Stack spacing={{ xs: 2, md: 3 }}>
        {/* PageTitle */}
        <PageHeader
          icon={<DashboardIcon />}
          title="ダッシュボード"
          description="1on1の実施状況と今後の予定を確認できます"
        />

        {/* MyMembersStatus */}
        <MyMembersStatus 
          myMembersData={myMembersData}
          organizationData={organizationData}
        />

        <Box sx={{
          display: 'grid',
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: { xs: '1fr', md: '1fr' },
          alignItems: 'start',
          justifyItems: 'stretch',
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>

          {/* TargetMemberList */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '800px', 
            overflow: 'hidden',
            minWidth: 0 // グリッドアイテムの最小幅を0に設定
          }}>
            <TargetMemberList members={demoMembers} />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default Top
