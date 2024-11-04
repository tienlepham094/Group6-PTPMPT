import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../views/Home";
import Register from "../views/Register/Register";
import Login from "../views/Login/Login";
import Dashboard from "../views/Dashboard/Dashboard";
import { About } from "../views/About/About";
import { Request } from "../views/Request/Request";
import { Resource } from "../views/Resource/Resource";
import { Account } from "../views/Account/Account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
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
