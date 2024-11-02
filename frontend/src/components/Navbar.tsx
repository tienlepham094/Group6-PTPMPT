import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./Navbar.css";

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
