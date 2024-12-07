import { Link, useLocation } from "react-router-dom";
import "./SideMenu.css";
import navigation from "../navigation";
import { useAuth } from "../context/useAuth";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
const SideMenu = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="side-menu">
      <div className="menu-header">
        <h3>RS Management</h3>
      </div>
      <div className="menu-links">
        {navigation().map((navItem) => (
          <Link
            to={`/${navItem.path}`}
            key={navItem.path}
            className={`menu-item ${isActive(`/${navItem.path}`) ? "active" : ""}`}
          >
            {navItem.icon}
            {navItem.title}
          </Link>
        ))}
      </div>
      <div className="menu-footer">
        <IconButton onClick={logout} className="logout-button">
          <LogoutIcon />
          <span>Log out</span>
        </IconButton>
      </div>
    </div>
  );
};

export default SideMenu;
