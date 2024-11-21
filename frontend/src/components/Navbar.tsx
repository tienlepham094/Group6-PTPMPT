// components/Navbar.tsx
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/useAuth";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchField from "./SearchField";
import AccountSetting from "./AccountSetting";
import { IconButton } from "@mui/material";

interface NavbarProps {
  pageName: string;
}

const Navbar = ({ pageName }: NavbarProps) => {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {isLoggedIn() ? (
          <span className="page-name">{pageName}</span>
        ) : (
          <Link to="/" className="navbar-brand">
            {pageName}
          </Link>
        )}
      </div>
      <div className="navbar-right">
        {isLoggedIn() ? (
          <div className="navbar-user">
            <SearchField />
            <IconButton style={{ backgroundColor: "white" }}>
              <NotificationsNoneIcon className="notification-icon" />
            </IconButton>
            <AccountSetting userName={user?.userName} />
          </div>
        ) : (
          <div className="navbar-auth-buttons">
            <HelpOutlineIcon />
            <Link to="/login" className="auth-button sign-in-button">
              Sign in
            </Link>
            <Link to="/register" className="auth-button sign-up-button">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
