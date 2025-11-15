import { Outlet, Navigate } from "react-router-dom";
import NavMenu from "../Pages/NavMenu"
import RoutesPath from "../routes/RoutesPath";
import { FlutterDashOutlined } from "@mui/icons-material";

export default function AuthLayout({isAuthenticated}) {

  const dev_preview = FlutterDashOutlined


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

