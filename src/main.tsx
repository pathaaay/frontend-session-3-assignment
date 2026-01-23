import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/about.tsx";
import Products from "./pages/products.tsx";
import SingleProductCustomize from "./pages/product/single-product-customize.tsx";
import NotFoundPage from "./pages/not-found.tsx";
import MainLayout from "./layouts/main-layout.tsx";
import CartPage from "./pages/cart.tsx";
import ShopLayout from "./layouts/shop-layout.tsx";
import SingleProduct from "./pages/product/single-product.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "shop",
        element: <ShopLayout />,
        children: [
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "product",
            children: [
              {
                path: ":productId",
                element: <SingleProduct />,
                children: [
                  {
                    path: "customize",
                    element: <SingleProductCustomize />,
                  },
                ],
              },
            ],
          },
          {
            path: "cart",
            element: <CartPage />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
