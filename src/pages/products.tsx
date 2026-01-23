import { fetchProducts } from "../queries/product";
import { ProductCard } from "../components/product-card";
import { createPortal } from "react-dom";
import { useState } from "react";
import AddProductModal from "../components/add-product-form";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/rootReducer";

const Products = () => {
  const { data, isFetching, error } = fetchProducts();
  const [addproductModalOpen, setAddProductModalOpen] = useState(false);
  // Using cart here because if the cart data changes then only products will rerendered the product card will only be rendered if the particular product is added or removed from cart.
  // Note: the product card will be rendered only once either we put here or in product card, because in products page we are not updating cart state in this page so.
  const { cart } = useSelector((state: RootState) => state.cart);
  console.log("product page rendering");
  return (
    <div className="flex flex-col justify-start gap-2 p-2 w-full">
      <button
        className="bg-cyan-500 w-max p-1 px-2 rounded-md cursor-pointer"
        onClick={() => setAddProductModalOpen(true)}
      >
        Add Product
      </button>
      {addproductModalOpen &&
        createPortal(
          <AddProductModal onClose={() => setAddProductModalOpen(false)} />,
          document.body,
        )}
      {
        <>
          {isFetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele) => (
                <div
                  key={ele}
                  className="h-44 bg-gray-200 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          ) : error ? (
            <div className="flex items-center w-full justify-center">
              <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
                <div className="font-bold text-red-500">
                  Error loading Product
                </div>
              </div>
            </div>
          ) : data && data?.products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {data?.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAddedToCart={cart.some(
                    (cart) => cart.product.id === product.id,
                  )}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
              <div className="font-bold text-lg">No Products Found</div>
            </div>
          )}
        </>
      }
    </div>
  );
};

export default Products;
