import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'

const drawerWidth = 240

function NavList() {
  const location = useLocation()
  const items = [
    { to: '/top', label: 'TOP画面', icon: <DashboardIcon /> },
    { to: '/members', label: 'メンバー一覧', icon: <GroupIcon /> },
    { to: '/admin', label: '管理者メニュー', icon: <SettingsIcon /> },
  ]
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.to} disablePadding>
          <ListItemButton component={RouterLink} to={item.to} selected={location.pathname.startsWith(item.to)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default function AppLayout({ children }: PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isUpMd = useMediaQuery('(min-width:900px)')

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" noWrap>1on1管理システム</Typography>
      </Toolbar>
      <Divider />
      <NavList />
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      {/* <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">v1.0.0</Typography>
      </Box> */}
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {!isUpMd && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen((v) => !v)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>1on1管理システム</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <AccountCircleIcon /> */}
            <Button color="inherit">ログイン</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Side drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="navigation">
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        {/* Desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, md: 3 }, 
        width: { md: `calc(100% - ${drawerWidth}px)` },
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        <Toolbar />
        <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
