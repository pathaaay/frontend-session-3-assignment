import { fetchProducts } from "../queries/product";
import { ProductCard } from "../components/product-card";
import { createPortal } from "react-dom";
import { useState } from "react";
import AddProductModal from "../components/add-product-form";

const Products = () => {
  const { data, isFetching, error } = fetchProducts();
  const [productModalOpen, setProductModalOpen] = useState(false);
  return (
    <div className="flex flex-col justify-start gap-2 p-2 w-full">
      <button
        className="bg-cyan-500 w-max p-1 px-2 rounded-md cursor-pointer"
        onClick={() => setProductModalOpen(true)}
      >
        Add Product
      </button>
      {productModalOpen &&
        createPortal(
          <AddProductModal onClose={() => setProductModalOpen(false)} />,
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
                <ProductCard key={product.id} product={product} />
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
