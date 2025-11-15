import { Outlet } from "react-router-dom";
import NavMenu from "../Pages/NavMenu";

export default function PublicLayout() {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
}
