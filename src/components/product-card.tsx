import React from "react";
import type { ProductType } from "../lib/types";
import { NavLink, useNavigate } from "react-router";
import { Button } from "./button";

interface ProductCardProps {
  product: ProductType;
  isAddedToCart: boolean;
}

export const ProductCard = React.memo(function ProductCard({
  product,
  isAddedToCart,
}: ProductCardProps) {
  if (!product) return;

  const navigate = useNavigate();

  const isPremium = product.price > 500 ? true : false;
  return (
    <NavLink
      to={{
        pathname: `/shop/product/${product.id}`,
      }}
      className={`bg-gray-100 rounded-md h-max p-4 flex flex-col gap-3 relative ${isPremium ? "border border-sky-500" : ""}`}
    >
      <div>
        <div className="flex items-center gap-1">
          <img
            src={product.thumbnail}
            className="h-10 w-10 object-cover rounded bg-gray-200"
            loading="lazy"
            height={40}
            width={40}
          />
          <div className={`text-lg font-medium`}>{product.title} </div>
        </div>
        <div className="text-xs capitalize">{product.category}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.stock}</div>
      </div>
      <div className="flex items-center justify-start gap-2">
        {product.tags.map((tag) => (
          <div
            key={tag}
            className="bg-gray-200 rounded-md p-0.5 px-1 capitalize text-xs"
          >
            {tag}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 w-full"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/shop/product/${product.id}/customize`);
        }}
      >
        Add to Cart{" "}
      </Button>

      {/* Low Stock Badge */}
      {product.stock < 5 && (
        <div className="p-0.5 px-1 text-xs absolute right-0 top-0 bg-orange-100 text-orange-500 rounded-md">
          Limited Quantity
        </div>
      )}

      {/* Premium Product Badge */}
      {isPremium && (
        <div className="bg-linear-60 from-purple-500 to-blue-500 text-white font-medium text-center w-max absolute -top-1 left-0 right-0 rounded-md text-xs px-1 p-0.5">
          Premium
        </div>
      )}
      {isAddedToCart && (
        <div
          className={`bg-linear-60 from-orange-500 to-pink-500 text-white font-medium text-center w-max absolute -top-1 right-0 rounded-md text-xs px-1 p-0.5 transition `}
        >
          Added to cart
        </div>
      )}
    </NavLink>
  );
});
