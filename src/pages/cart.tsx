import CartCard from "../components/cart-card";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/rootReducer";
import { useEffect, useState } from "react";
import { type ProductType } from "../lib/types";
import { NavLink } from "react-router";
import { Button } from "../components/button";
import { clearCart } from "../store/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [productsData, setProductsData] = useState<Array<ProductType>>([]);

  useEffect(() => {
    if (cart.length === 0 && productsData.length > 0) setProductsData([]);
    else if (cart.length > 0) {
      let newProductData: ProductType[] = [];

      cart.forEach((cart) => {
        newProductData = [
          ...newProductData,
          ...cart.customizations.map((item) => ({ ...cart.product, ...item })),
        ];
      });

      setProductsData(newProductData);
    }
    return () => {};
  }, [cart]);

  const total = productsData.reduce(
    (acc, { qty, price }) => acc + qty * price,
    0,
  );
  const totalQuantity = productsData.reduce((acc, { qty }) => acc + qty, 0);

  return (
    <div className="p-5 gap-2 grid grid-cols-1 sm:grid-cols-2">
      {productsData.length > 0 ? (
        <div className="flex flex-col gap-2 items-start w-full">
          {productsData.map((item, index) => (
            <CartCard
              key={item.id + item.color! + item.size}
              product={item}
              idx={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
          <div className="font-bold text-lg">Cart is Empty</div>
        </div>
      )}
      <div className="flex flex-col bg-gray-200 w-full p-5 rounded-md h-max">
        <div className="text-3xl font-bold">Cart Summary</div>
        <div className="my-3 text-lg">
          {productsData.length > 0 ? (
            <>
              <div className="flex items-center justify-between border-y border-gray-400 py-3">
                <span>Total price:</span> <b>{total.toFixed(2)}</b>
              </div>
              <div className="flex items-center justify-between border-y border-gray-400 py-3">
                <span>Total Products in cart:</span>{" "}
                <b>{productsData.length}</b>
              </div>
              <div className="flex items-center justify-between border-y border-gray-400 py-3">
                <span>Total Quantity in cart:</span> <b>{totalQuantity}</b>
              </div>
            </>
          ) : (
            <>Nothing to show</>
          )}
        </div>
        {productsData.length > 0 ? (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              onClick={() => {
                dispatch(clearCart());
              }}
              variant="outline"
              className={`w-full`}
            >
              Clear Cart
            </Button>
            <NavLink to={"/checkout"} className={`w-full`}>
              <Button className={`w-full`}>Checkout</Button>
            </NavLink>
          </div>
        ) : (
          <NavLink to={"/"}>
            <Button className={`w-full`}>Add products</Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default CartPage;
