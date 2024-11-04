// components/Navbar.tsx
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/useAuth";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchField from "./SearchField";
import AccountSetting from "./AccountSetting";

interface NavbarProps {
  page: string;
}

const Navbar = ({ page }: NavbarProps) => {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {isLoggedIn() ? (
          <span>{page}</span>
        ) : (
          <Link to="/" className="navbar-brand">
            {page}
          </Link>
        )}
      </div>
      <div className="navbar-right">
        {isLoggedIn() ? (
          <div className="navbar-user">
            <SearchField />
            <NotificationsNoneIcon className="notification-icon" />
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
