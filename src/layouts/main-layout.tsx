import { Outlet } from "react-router";
import { Navbar } from "../components/navbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../store/store";

const MainLayout = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Outlet />
      <Toaster />
    </Provider>
  );
};

export default MainLayout;
