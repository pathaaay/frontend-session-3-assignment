import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/about.tsx";
import Products from "./pages/products.tsx";
import SingleProduct from "./pages/productId/single-product.tsx";
import SingleProductCustomize from "./pages/productId/single-product-customize.tsx";
import NotFoundPage from "./pages/not-found.tsx";
import MainLayout from "./layouts/main-layout.tsx";
import CartPage from "./pages/cart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "shop",
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
                children: [
                  {
                    index: true,
                    element: <SingleProduct />,
                  },
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
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
