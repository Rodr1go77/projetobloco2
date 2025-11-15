import { Outlet, Navigate } from "react-router";
import NavMenu from "../Pages/NavMenu"

export default function AuthLayout({isAuthenticated}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
}

