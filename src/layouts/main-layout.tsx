import { Outlet } from "react-router";
import { Navbar } from "../components/navbar";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default MainLayout;
