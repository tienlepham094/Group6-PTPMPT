import DashboardManageAccountsOutlinedIconIcon from "@mui/icons-material/Dashboard";
import ManageAccountsManageAccountsOutlinedIconIcon from "@mui/icons-material/ManageAccounts";
import DeveloperBoardManageAccountsOutlinedIconIcon from "@mui/icons-material/DeveloperBoard";
import ContentPasteManageAccountsOutlinedIconIcon from "@mui/icons-material/ContentPaste";
import InfoManageAccountsOutlinedIconIcon from "@mui/icons-material/Info";
import GroupIcon from "@mui/icons-material/Group";

const navigation = () => [
  {
    title: "Trang chủ",
    path: "dashboard",
    icon: <DashboardManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },
  {
    title: "Quản lý tài khoản",
    path: "account",
    icon: <ManageAccountsManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager"],
  },
  {
    title: "Quản lý nhóm",
    path: "group",
    icon: <GroupIcon />,
  },
  {
    title: "Quản lý tài nguyên",
    path: "resource",
    icon: <DeveloperBoardManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },
  {
    title: "Quản lý yêu cầu",
    path: "request",
    icon: <ContentPasteManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },

  {
    title: "Giới thiệu nhóm và phần mềm",
    path: "about",
    icon: <InfoManageAccountsOutlinedIconIcon />,
    role: ["admin", "manager", "user"],
  },
];

export default navigation;
