import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AppsIcon from "@mui/icons-material/Apps";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet, useNavigate } from "react-router-dom";
import { Image } from "mui-image";

const drawerWidth = 240;

type DrawerNavItem = {
  icon: React.ReactNode;
  title: string;
  route: string;
};

const primaryNavItem: DrawerNavItem[] = [
  {
    title: "Dashboard",
    route: "/",
    icon: <AppsIcon />,
  },
  {
    title: "Clients",
    route: "/clients",
    icon: <GroupIcon />,
  },
  // {
  //   title: "Import Clients",
  //   route: "/imports",
  //   icon: <GroupAddIcon />,
  // },
  {
    title: "Settings",
    route: "/settings",
    icon: <SettingsIcon />,
  },
];

const NavItem = ({ title, route, icon }: DrawerNavItem) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(route);
        }}
      >
        <ListItemIcon
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{
            color: theme.palette.text.secondary,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

//App Drawer
const Home = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.secondary,
          },
        }}
        anchor="left"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#303030",
            color: "#FFF",
          },
        }}
      >
        <Toolbar>
          <Stack
            direction="row"
            sx={{ paddingTop: 1, paddingBottom: 1 }}
            spacing={1}
          >
            <Image src={"./vite.svg"} width={65} style={{ margin: 0 }} />
            <Typography fontSize={18}>Payment Notification</Typography>
          </Stack>
        </Toolbar>
        <Divider />
        <List>
          {primaryNavItem.map((item) => (
            <NavItem key={item.title} {...item} />
          ))}
        </List>
      </Drawer>

      {/* CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          paddingTop: 9,
          width: "80%",
        }}
      >
        <Outlet
          context={{
            token: "auth-token",
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
