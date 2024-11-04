import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/useAuth";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const role = user?.role; // Access role from the user object

  const adminSidebarItems = ["Dashboard", "Manage Users", "Settings"];
  const userSidebarItems = ["Dashboard", "Profile"];

  const sidebarItems = role === "ADMIN" ? adminSidebarItems : userSidebarItems;

  const handleLogout = () => {
    logout();
  };

  return (
    <>Dashboard worked!</>
    // <Box sx={{ display: "flex" }}>
    //   <Drawer
    //     variant="permanent"
    //     sx={{
    //       width: 240,
    //       flexShrink: 0,
    //       [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
    //     }}
    //   >
    //     <List>
    //       {sidebarItems.map((text) => (
    //         <ListItem component="button" key={text}>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Button onClick={handleLogout} color="error" sx={{ mt: 2 }}>
    //       Logout
    //     </Button>
    //   </Drawer>
    //   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //     <Typography variant="h4">
    //       Welcome {user?.userName} to the {user?.role} Dashboard
    //     </Typography>
    //   </Box>
    // </Box>
  );
};

export default Dashboard;
