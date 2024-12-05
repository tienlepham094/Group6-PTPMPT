import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = { children: React.ReactNode };

const GuestRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default GuestRoute;
