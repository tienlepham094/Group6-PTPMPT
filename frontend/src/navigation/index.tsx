import DashboardManageAccountsOutlinedIconIcon from "@mui/icons-material/Dashboard";
import ManageAccountsManageAccountsOutlinedIconIcon from "@mui/icons-material/ManageAccounts";
import DeveloperBoardManageAccountsOutlinedIconIcon from "@mui/icons-material/DeveloperBoard";
import ContentPasteManageAccountsOutlinedIconIcon from "@mui/icons-material/ContentPaste";
import InfoManageAccountsOutlinedIconIcon from "@mui/icons-material/Info";

const navigation = () => [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: <DashboardManageAccountsOutlinedIconIcon />,
  },
  {
    title: "Account",
    path: "account",
    icon: <ManageAccountsManageAccountsOutlinedIconIcon />,
  },
  {
    title: "Resource",
    path: "resource",
    icon: <DeveloperBoardManageAccountsOutlinedIconIcon />,
  },
  {
    title: "Request",
    path: "request",
    icon: <ContentPasteManageAccountsOutlinedIconIcon />,
  },
  {
    title: "About",
    path: "about",
    icon: <InfoManageAccountsOutlinedIconIcon />,
  },
];

export default navigation;
