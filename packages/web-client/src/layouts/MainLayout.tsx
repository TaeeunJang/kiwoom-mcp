import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  PeopleAlt as PeopleAltIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const drawerWidth = 260;

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: "종목 정보", path: "/", icon: <DashboardIcon /> },
  { title: "호가 정보", path: "/price", icon: <BarChartIcon /> },
  {
    title: "기관/외국인 동향",
    path: "/foreign-institutional",
    icon: <PeopleAltIcon />,
  },
];

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src="https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_analytics.svg"
          sx={{ width: 32, height: 32, mr: 2 }}
        />
        <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700 }}>
          키움 MCP API
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", p: 1, pb: 1.5 }}>
          <Avatar
            src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"
            alt="User Avatar"
            sx={{ width: 36, height: 36, mr: 2 }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              사용자
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              관리자
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.title}
            disablePadding
            component={Link}
            to={item.path}
            sx={{ color: "inherit", textDecoration: "none", mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                borderRadius: 1,
                py: 1,
                px: 1,
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: theme.shadows[2],
          bgcolor: "background.paper",
        }}
      >
        <Toolbar sx={{ height: 64 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "text.primary",
              fontWeight: 600,
              display: { xs: "none", sm: "block" },
            }}
          >
            키움 MCP API 테스트
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "text.primary",
              fontWeight: 600,
              display: { xs: "block", sm: "none" },
            }}
          >
            키움 MCP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Tooltip title="알림">
              <IconButton>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="계정">
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* 모바일 드로어 */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // 모바일 성능 향상을 위해
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* 데스크톱 드로어 */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxShadow: "none",
              borderRight: "1px dashed rgba(145, 158, 171, 0.2)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 3 },
          pt: { xs: 9, sm: 10 }, // Toolbar 높이 + padding 고려
        }}
      >
        <Box sx={{ width: "100%", flexGrow: 1, maxWidth: 1600, mx: "auto" }}>
          {/* @ts-ignore */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
