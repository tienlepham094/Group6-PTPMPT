import DashboardManageAccountsOutlinedIconIcon from "@mui/icons-material/Dashboard";
import ManageAccountsManageAccountsOutlinedIconIcon from "@mui/icons-material/ManageAccounts";
import DeveloperBoardManageAccountsOutlinedIconIcon from "@mui/icons-material/DeveloperBoard";
import ContentPasteManageAccountsOutlinedIconIcon from "@mui/icons-material/ContentPaste";
import InfoManageAccountsOutlinedIconIcon from "@mui/icons-material/Info";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
const navigation = () => [
  {
    title: "Trang chủ",
    path: "dashboard",
    icon: <DashboardManageAccountsOutlinedIconIcon />,
    role: ["ADMIN", "MANAGER", "USER"],
  },
  {
    title: "Quản lý tài khoản",
    path: "account",
    icon: <ManageAccountsManageAccountsOutlinedIconIcon />,
    role: ["ADMIN", "MANAGER", "USER"],
  },
  {
    title: "Quản lý nhóm",
    path: "group",
    icon: <GroupIcon />,
    role: ["ADMIN"],
  },
  {
    title: "Quản lý tài nguyên",
    path: "resource",
    icon: <DeveloperBoardManageAccountsOutlinedIconIcon />,
    role: ["ADMIN", "MANAGER", "USER"],
  },
  {
    title: "Quản lý yêu cầu",
    path: "request",
    icon: <ContentPasteManageAccountsOutlinedIconIcon />,
    role: ["ADMIN", "MANAGER", "USER"],
  },
  {
    title: "Lịch sử cấp phát",
    path: "history",
    icon: <HistoryIcon />,
    role: ["ADMIN", "MANAGER"],
  },
  {
    title: "Hỗ trợ",
    path: "about",
    icon: <InfoManageAccountsOutlinedIconIcon />,
    role: ["ADMIN", "MANAGER", "USER"],
  },
];

export default navigation;
