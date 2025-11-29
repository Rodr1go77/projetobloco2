import { Outlet, Navigate } from "react-router-dom";
import NavMenu from "../Pages/NavMenu"
import RoutesPath from "../routes/RoutesPath";


export default function AuthLayout({ isAuthenticated }) {

  const dev_preview = false

  if (!isAuthenticated && !dev_preview) {
    return <Navigate to={RoutesPath.LOGIN} replace />
  }
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
}

