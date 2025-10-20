import { 
  Card, 
  CardContent, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  Box
} from '@mui/material'

interface Member {
  id: number
  name: string
  status: 'done' | 'planned' | 'not'
  meetingDate?: string
}

interface TargetMemberListProps {
  members: Member[]
}

function StatusChip({ status }: { status: 'done' | 'planned' | 'not' }) {
  const map = {
    done: { label: '完了', color: 'success' as const },
    planned: { label: '予定済', color: 'info' as const },
    not: { label: '未確定', color: 'error' as const },
  }
  const s = map[status]
  return <Chip size="small" label={s.label} color={s.color} />
}

export default function TargetMemberList({ members }: TargetMemberListProps) {
  return (
    <Card sx={{ 
      bgcolor: 'background.paper',
      border: 1,
      borderColor: 'divider',
      boxShadow: 1
    }}>
      <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
        >
          担当メンバー
        </Typography>
        <TableContainer sx={{ 
          maxWidth: '100%',
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          bgcolor: 'background.paper',
          borderRadius: 1
        }}>
          <Table size="small" sx={{ 
            minWidth: { xs: 300, sm: 400 },
            maxWidth: '100%',
            width: '100%'
          }}>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ minWidth: { xs: 100, sm: 120 }, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  名前
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    display: { xs: 'none', sm: 'table-cell' },
                    minWidth: 100,
                    fontSize: { xs: '0.8rem', md: '0.875rem' }
                  }}
                >
                  予定日
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 80, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                  ステータス
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow 
                  key={member.id} 
                  hover
                  onClick={() => window.location.href = `/members/${member.id}/edit`}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <TableCell sx={{ minWidth: { xs: 100, sm: 120 } }}>
                    <Box>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium"
                        sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                      >
                        {member.name}
                      </Typography>
                      {member.meetingDate && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            display: { xs: 'block', sm: 'none' },
                            fontSize: { xs: '0.7rem', md: '0.75rem' }
                          }}
                        >
                          予定日: {member.meetingDate}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      display: { xs: 'none', sm: 'table-cell' },
                      minWidth: 100,
                      fontSize: { xs: '0.8rem', md: '0.875rem' }
                    }}
                  >
                    {member.meetingDate || '-'}
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: 80 }}>
                    <StatusChip status={member.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
