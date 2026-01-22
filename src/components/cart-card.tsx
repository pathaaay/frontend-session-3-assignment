import { useDispatch } from "react-redux";
import { fetchProductById } from "../queries/product";
import { Button } from "./button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import {
  removeProductFromCart,
  decrementProductInCart,
  incrementProductInCart,
} from "../store/slices/cartSlice";
import type { ProductType } from "../lib/types";

interface CartCardProps {
  product: ProductType;
  idx: number;
}
const CartCard = ({ product, idx }: CartCardProps) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`bg-gray-100 rounded-md h-max p-4 flex flex-col gap-3 relative w-full`}
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
          <div className={`text-lg font-medium `}>{product.title} </div>
        </div>
        <div className="text-xs capitalize">{product.category}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.stock}</div>
      </div>
      <div className="flex items-center gap-2">
        Color:{" "}
        <div className="flex items-center gap-1">
          <div
            className={`h-10 w-10 rounded-md cursor-pointer `}
            style={{ background: product.color }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        Size:{" "}
        <div className="flex items-center gap-2">
          <div
            className={`bg-gray-200 p-1 px-2 cursor-pointer w-max rounded-md `}
            style={{ background: product.size }}
          >
            {product.size}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 w-max">
        <div className="flex items-center justify-between w-full gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 w-max"
            onClick={() => dispatch(decrementProductInCart({ product }))}
          >
            <MinusIcon size={20} />
          </Button>
          <div className="bg-gray-200 px-2 p-1 text-center w-full rounded-md">
            {product.qty}
          </div>
          <Button
            variant="outline"
            className={`flex items-center justify-center gap-2 w-max `}
            onClick={() => dispatch(incrementProductInCart({ product }))}
          >
            <PlusIcon size={20} />
          </Button>
          <Button
            variant="destructive"
            className="flex items-center justify-center gap-2 w-max p-1"
            onClick={() => dispatch(removeProductFromCart(product))}
          >
            <TrashIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
