import { Outlet } from "react-router";
import NavMenu from "../Pages/NavMenu"

export default function AuthLayout() {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
}

