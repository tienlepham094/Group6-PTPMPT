import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute"; // Import GuestRoute
import Home from "../views/Home";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import Dashboard from "../views/Dashboard/Dashboard";
import { About } from "../views/About/About";
import { Request } from "../views/Request/Request";
import { Resource } from "../views/Resource/Resource";
import { Account } from "../views/Account/Account";
import { UserProvider } from "../context/useAuth"; // Import UserProvider
import { Approval } from "../views/Approval/Approval";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      { path: "", element: <Home /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "resource",
        element: (
          <ProtectedRoute>
            <Resource />
          </ProtectedRoute>
        ),
      },
      {
        path: "request",
        element: (
          <ProtectedRoute>
            <Request />
          </ProtectedRoute>
        ),
      },
      {
        path: "approval",
        element: (
          <ProtectedRoute>
            <Approval />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
