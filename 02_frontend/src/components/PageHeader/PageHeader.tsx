import { Box, Stack, Typography } from '@mui/material'
import type { ReactElement } from 'react'

interface PageHeaderProps {
  icon?: ReactElement
  title: string
  description?: string
}

export default function PageHeader({ icon, title, description }: PageHeaderProps) {
  return (
    <Stack spacing={1} mb={2}>
      <Typography variant="h4" component="h1" fontWeight="bold" display="flex" alignItems="center" gap={1}>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          {icon && (
            <Box sx={{ fontSize: 36, color: 'primary.main', mr: 1 }}>
              {icon}
            </Box>
          )}
          {title}
        </Box>
      </Typography>
      {description && (
        <Typography sx={{ textAlign: 'left' }} color="text.secondary" variant="subtitle1">
          {description}
        </Typography>
      )}
    </Stack>
  )
}
