import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/useAuth";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Resource Management
        </Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn() ? (
          <div className="navbar-user">
            <span>Welcome, {user?.userName}</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
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
