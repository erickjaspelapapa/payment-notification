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
import FolderSharedIcon from "@mui/icons-material/FolderShared";
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
  {
    title: "Payment Records",
    route: "/records",
    icon: <FolderSharedIcon />,
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
            color: "#fff",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{
            color: "#fff",
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
            background: "#1E5631",
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
            <Image
              src={"../logo.png"}
              width={65}
              style={{ margin: 0, border: "solid 1px #fff" }}
            />
            <Typography fontSize={18}>Prime Empire88</Typography>
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
