import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
} from "@mui/material";
import {
  InfoOutlined,
  ShowChartOutlined,
  PeopleOutlineOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { text: "종목 정보", path: "/", icon: <InfoOutlined /> },
  { text: "호가 정보", path: "/price", icon: <ShowChartOutlined /> },
  {
    text: "기관/외국인 동향",
    path: "/foreign-institutional",
    icon: <PeopleOutlineOutlined />,
  },
];

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            키움 MCP API 테스트
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            키움 MCP API
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              component={Link}
              to={item.path}
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* 공간 확보용 */}
        <Box sx={{ width: "100%" }}>
          {/* @ts-ignore */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
