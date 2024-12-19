import { Outlet, useLocation } from "react-router-dom";
import "./UserLayout.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth";
import SideMenu from "../components/SideMenu";
import navigation from "../navigation";
import { Alert } from "@mui/material";
import { useEffect } from "react";

const UserLayout = () => {
  const { isLoggedIn, openAlert, severity, message, setOpenAlert } = useAuth();
  const location = useLocation();

  const currentPage = navigation().find(
    (item) => `/${item.path}` === location.pathname
  );
  const pageName = currentPage ? currentPage.title : "Resource Management";
  console.log(pageName);

  useEffect(() => {
    if (openAlert) {
      const timer = setTimeout(() => {
        setOpenAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [openAlert, setOpenAlert]);

  return (
    <>
      {openAlert && (
        <div className="alert-container">
          <Alert
            severity={severity}
            variant="standard"
            onClose={() => setOpenAlert(false)}
          >
            {message}
          </Alert>
        </div>
      )}
      {isLoggedIn() ? <SideMenu /> : null}
      <div
        className={`container ${isLoggedIn() ? "logged-in" : "not-logged-in"}`}
      >
        <Navbar pageName={pageName} />
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
