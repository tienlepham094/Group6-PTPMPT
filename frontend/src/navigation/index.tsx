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
  },
  {
    title: "Tài khoản",
    path: "account",
    icon: <ManageAccountsManageAccountsOutlinedIconIcon />,
  },
  {
    title: "Tài nguyên",
    path: "resource",
    icon: <DeveloperBoardManageAccountsOutlinedIconIcon />,
  },
  {
    title: "Yêu cầu",
    path: "request",
    icon: <ContentPasteManageAccountsOutlinedIconIcon />,
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
  },
];

export default navigation;
