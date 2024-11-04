import { Link, useLocation } from "react-router-dom";
import "./SideMenu.css"; // Ensure this CSS file is created and linked
import HomeIcon from "@mui/icons-material/Home"; // Import icons as needed

const SideMenu = () => {
  const location = useLocation();

  // Utility function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="side-menu">
      <div className="menu-header">
        <h3>RS Management</h3>
      </div>

      <div className="menu-links">
        <Link
          to="/dashboard"
          className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
        >
          <HomeIcon className="menu-icon" />
          Dashboard
        </Link>
        <Link
          to="/account"
          className={`menu-item ${isActive("/account") ? "active" : ""}`}
        >
          <HomeIcon className="menu-icon" />
          Account management
        </Link>
        <Link
          to="/resource"
          className={`menu-item ${isActive("/resource") ? "active" : ""}`}
        >
          <HomeIcon className="menu-icon" />
          Resource management
        </Link>
        <Link
          to="/request"
          className={`menu-item ${isActive("/request") ? "active" : ""}`}
        >
          <HomeIcon className="menu-icon" />
          Request management
        </Link>
        <Link
          to="/about"
          className={`menu-item ${isActive("/about") ? "active" : ""}`}
        >
          <HomeIcon className="menu-icon" />
          About
        </Link>
      </div>

      <div className="menu-footer">
        <button className="logout-button">
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
