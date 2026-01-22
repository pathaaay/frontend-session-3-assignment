import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import { type ProductType } from "../../lib/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const SingleProductCustomize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [customization, setCustomization] = useState({
    color: "blue",
    size: "UK-7",
  });
  const { product } = useOutletContext<{ product: ProductType }>();

  return (
    <div className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center">
      <NavLink
        to={`/shop/product/${productId}`}
        className="absolute inset-0 cursor-default"
      />
      <div className="bg-gray-200 z-10 shadow-xl p-5 rounded-lg w-lg flex items-center justify-center ">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <div>{product?.title}</div>
          <div>Price: ${product?.price}</div>
          <div>In Stock: {product?.stock}</div>
          <div className="flex items-center gap-2">
            Select Color:{" "}
            <div className="flex items-center gap-1">
              {["red", "green", "blue"].map((ele) => (
                <div
                  key={ele}
                  className={`h-10 w-10 rounded-md cursor-pointer ${customization.color === ele ? "ring-2 ring-purple-500 ring-offset-1 " : ""}`}
                  style={{ background: ele }}
                  onClick={() =>
                    setCustomization((prev) => ({ ...prev, color: ele }))
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            Select Size:{" "}
            <div className="flex items-center gap-2">
              {["UK-7", "UK-8", "UK-9", "UK-10"].map((ele) => (
                <div
                  key={ele}
                  className={`bg-gray-100 p-1 px-2 cursor-pointer w-max rounded-md ${customization.size === ele ? "ring-2 ring-purple-500 ring-offset-1" : ""}`}
                  style={{ background: ele }}
                  onClick={() =>
                    setCustomization((prev) => ({ ...prev, size: ele }))
                  }
                >
                  {ele}
                </div>
              ))}
            </div>
          </div>
          <button
            className={`bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded hover:bg-blue-600`}
            onClick={() => {
              dispatch(addToCart({ product, customization }));
              navigate("/shop/cart");
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCustomize;
