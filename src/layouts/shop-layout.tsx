import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";

const queryClient = new QueryClient();

const ShopLayout = () => {
  return (
    <div className="p-5 flex items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
};

export default ShopLayout;
