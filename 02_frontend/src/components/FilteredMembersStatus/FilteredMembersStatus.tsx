import { 
  Card, 
  CardContent, 
  Stack, 
  Typography, 
  Divider,
} from '@mui/material'

interface StatusData {
  completed: number
  planned: number
  pending: number
}

interface MyMembersStatusProps {
  filteredData: StatusData
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
  filteredData
}: MyMembersStatusProps) {
  const title = 'フィルター適用後の実施状況'

  return (
    <Card sx={{ maxWidth: 900, width: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
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
            count={filteredData.completed}
            description="今月の実施件数"
            color="success"
          />
          <StatusCard
            title="予定確定"
            count={filteredData.planned}
            description="今後の予定"
            color="warning"
          />
          <StatusCard
            title="未確定"
            count={filteredData.pending}
            description="日程調整中"
            color="error"
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
