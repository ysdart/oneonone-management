import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Button,
  Stack,
  Box,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material'
import {
  Visibility as ViewIcon,
  Edit as EditIcon
} from '@mui/icons-material'

export interface Member {
  id: number
  name: string
  department: string
  status: 'completed' | 'planned' | 'pending' | 'overdue'
  scheduledDate?: string
  mentor: string
  lastUpdated: string
}

interface MemberListProps {
  members: Member[]
  onPageChange: (page: number, rowsPerPage: number) => void
  page: number
  rowsPerPage: number
  totalCount: number
}

const getStatusColor = (status: Member['status']) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'planned':
      return 'warning'
    case 'pending':
      return 'info'
    default:
      return 'default'
  }
}

const getStatusLabel = (status: Member['status']) => {
  switch (status) {
    case 'completed':
      return '完了'
    case 'planned':
      return '予定済み'
    case 'pending':
      return '未実施'
    default:
      return status
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function MemberList({ 
  members, 
  onPageChange, 
  page, 
  rowsPerPage, 
  totalCount 
}: MemberListProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageChange(0, parseInt(event.target.value, 10))
  }

  if (isMobile) {
    // モバイル表示：カード形式
    return (
      <Stack spacing={2}>
        {members.map((member) => (
          <Card key={member.id} variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box flex={1}>
                    <Typography variant="h6" component="div">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.department}
                    </Typography>
                  </Box>
                  <Chip
                    label={getStatusLabel(member.status)}
                    color={getStatusColor(member.status)}
                    size="small"
                  />
                </Stack>

                <Stack spacing={1}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      担当メンター
                    </Typography>
                    <Typography variant="body2">
                      {member.mentor}
                    </Typography>
                  </Box>
                  
                  {member.scheduledDate && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        予定日
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(member.scheduledDate)}
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      最終更新
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(member.lastUpdated)}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    component={Link}
                    to={`/members/${member.id}`}
                    variant="outlined"
                    size="small"
                    startIcon={<ViewIcon />}
                  >
                    詳細
                  </Button>
                  <Button
                    component={Link}
                    to={`/members/${member.id}/edit`}
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    編集
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="表示件数:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} / ${count !== -1 ? count : `${to}以上`}`
          }
        />
      </Stack>
    )
  }

  // デスクトップ表示：テーブル形式
  return (
    <Card>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>メンバー</TableCell>
              <TableCell>部署</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>予定日</TableCell>
              <TableCell>担当メンター</TableCell>
              <TableCell>最終更新</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {member.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {member.department}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(member.status)}
                    color={getStatusColor(member.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {member.scheduledDate ? (
                    <Typography variant="body2">
                      {formatDate(member.scheduledDate)}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      -
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {member.mentor}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(member.lastUpdated)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Tooltip title="詳細表示">
                      <IconButton
                        component={Link}
                        to={`/members/${member.id}`}
                        size="small"
                        color="primary"
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="編集">
                      <IconButton
                        component={Link}
                        to={`/members/${member.id}/edit`}
                        size="small"
                        color="secondary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage="表示件数:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} / ${count !== -1 ? count : `${to}以上`}`
        }
      />
    </Card>
  )
}
