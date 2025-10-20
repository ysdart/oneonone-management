import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  Stack, 
  Typography, 
  Switch, 
  Divider,
  Button,
  Box,
  IconButton
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';

interface StatusData {
  completed: number
  planned: number
  pending: number
}

interface MyMembersStatusProps {
  myMembersData: StatusData
  organizationData: StatusData
}

function StatusCard({ 
  title, 
  count, 
  description, 
  color 
}: { 
  title: string
  count: number
  description: string
  color: 'success' | 'warning' | 'error'
}) {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        bgcolor: `${color}.light`, 
        color: `${color}.contrastText`, 
        width: { xs: '100%', sm: 'auto' },
        flex: { xs: 'none', sm: 1 },
        minHeight: 120
      }}
    >
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="h4">{count}</Typography>
          <Typography variant="caption">{description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default function MyMembersStatus({ 
  myMembersData, 
  organizationData 
}: MyMembersStatusProps) {
  const [showOrganization, setShowOrganization] = useState(false)
  
  const currentData = showOrganization ? organizationData : myMembersData
  const title = showOrganization ? '今月の実施状況（組織全体）' : '今月の実施状況（担当メンバー）'

  return (
    <Card sx={{ maxWidth: 900, width: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          
          {/* デスクトップ用のトグル */}
          <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <Typography variant="body2">担当</Typography>
            <Switch 
              size="small" 
              checked={showOrganization}
              onChange={(e) => setShowOrganization(e.target.checked)}
            />
            <Typography variant="body2">組織全体</Typography>
          </Stack>

          {/* モバイル用のトグル（1つのボタンで切り替え） */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="small"
              onClick={() => setShowOrganization(!showOrganization)}
              sx={{
                bgcolor: showOrganization ? 'secondary.main' : 'primary.main',
                color: 'white',
                border: 1,
                borderColor: showOrganization ? 'secondary.main' : 'primary.main',
                '&:hover': {
                  bgcolor: showOrganization ? 'secondary.dark' : 'primary.dark'
                }
              }}
            >
              {showOrganization ? <BusinessIcon /> : <GroupIcon />}
            </IconButton>
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2} 
          useFlexGap 
          flexWrap="wrap" 
          alignItems="stretch"
        >
          <StatusCard
            title="実施済"
            count={currentData.completed}
            description="今月の実施件数"
            color="success"
          />
          <StatusCard
            title="予定確定"
            count={currentData.planned}
            description="今後の予定"
            color="warning"
          />
          <StatusCard
            title="未確定"
            count={currentData.pending}
            description="日程調整中"
            color="error"
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
