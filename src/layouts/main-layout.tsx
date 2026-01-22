import { Outlet } from "react-router";
import { Navbar } from "../components/navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
