import { type UseQueryResult } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import type { ProductType } from "../../lib/types";

const SingleProduct = () => {
  const { data, isFetching, error } =
    useOutletContext<UseQueryResult<ProductType>>();

  if (!data) return null;

  return (
    <>
      {isFetching ? (
        <div className="grid grid-cols-4 gap-2">
          <div className="h-44 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      ) : error ? (
        <div className="flex items-center w-full justify-center">
          <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
            <div className="font-bold text-red-500">
              Error loading Product Details
            </div>
          </div>
        </div>
      ) : data ? (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            className="w-full h-56 object-cover"
            src={data.thumbnail}
            alt="Product image"
          />
          <div className="p-4">
            <h4 className="text-xl font-semibold text-gray-800">
              {data.title}
            </h4>
            <p className="mt-2 text-gray-600">{data.description}</p>
            <div className="flex items-center mt-4">
              <h5 className="text-lg font-bold text-gray-900">{data.price}</h5>
              <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
          <div className="font-bold text-lg">No Products Found</div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
