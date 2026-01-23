import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const ShopLayout = () => {
  const route = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (route.key === "default") navigate("products", { replace: true });
  }, [route]);

  return (
    <div className="p-5 flex items-center justify-center w-full">
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
};

export default ShopLayout;
