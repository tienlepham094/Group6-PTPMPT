import { Outlet } from "react-router-dom";
import "./UserLayout.css";
import Navbar from "../components/Navbar";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Navbar />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
