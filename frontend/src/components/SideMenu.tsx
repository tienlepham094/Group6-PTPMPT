import { Link, useLocation } from "react-router-dom";
import "./SideMenu.css";
import navigation from "../navigation";
import { useAuth } from "../context/useAuth";

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
        <button className="logout-button" onClick={logout}>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
