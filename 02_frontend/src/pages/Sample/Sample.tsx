import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'

function Sample() {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">MUI サンプル</Typography>
        <Card>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="名前" variant="outlined" fullWidth />
              <Button variant="contained">送信</Button>
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row" spacing={1}>
          <Button variant="text">Text</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="contained">Contained</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Sample


