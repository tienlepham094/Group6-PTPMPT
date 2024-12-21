import DashboardManageAccountsOutlinedIconIcon from "@mui/icons-material/Dashboard";
import ManageAccountsManageAccountsOutlinedIconIcon from "@mui/icons-material/ManageAccounts";
import DeveloperBoardManageAccountsOutlinedIconIcon from "@mui/icons-material/DeveloperBoard";
import ContentPasteManageAccountsOutlinedIconIcon from "@mui/icons-material/ContentPaste";
import InfoManageAccountsOutlinedIconIcon from "@mui/icons-material/Info";

const navigation = () => [
  {
    title: "Trang chủ",
    path: "dashboard",
    icon: <DashboardManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },
  {
    title: "Tài khoản",
    path: "account",
    icon: <ManageAccountsManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager"],
  },
  {
    title: "Tài nguyên",
    path: "resource",
    icon: <DeveloperBoardManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },
  {
    title: "Yêu cầu",
    path: "request",
    icon: <ContentPasteManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },
  // {
  //   title: "Chấp thuận",
  //   path: "approval",
  //   icon: <ContentPasteManageAccountsOutlinedIconIcon />,
  // },
  {
    title: "Giới thiệu",
    path: "about",
    icon: <InfoManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },
];

export default navigation;
