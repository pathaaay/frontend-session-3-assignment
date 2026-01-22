import { Fragment } from "react/jsx-runtime";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/rootReducer";
import { useEffect } from "react";
import { loadCartDataFromLocalStorage } from "../store/slices/cartSlice";

const navItems = [
  {
    name: "Products",
    href: "/shop/products",
  },
  {
    name: "Cart",
    href: "/shop/cart",
  },
  {
    name: "About",
    href: "/about",
  },
];
export const Navbar = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartDataFromLocalStorage());
    return () => {};
  }, []);

  const totalItems = cart.reduce(
    (acc, { customizations }) =>
      acc + customizations.reduce((acc2, { qty }) => acc2 + qty, 0),
    0,
  );
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-slate-800 text-white py-2 px-5 md:px-20 flex items-center justify-between sticky top-0 z-10">
        <NavLink to={"/"} className={`text-2xl font-bold `}>
          SwithShop
        </NavLink>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 max-md:hidden">
            {navItems.map((item) => (
              <Fragment key={item.href}>
                <div className={"flex items-center gap-0.5 p-1 rounded"}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm flex gap-2 cursor-pointer transition ${isActive ? "text-amber-300" : "text-slate-300 hover:text-slate-50"}`
                    }
                  >
                    {item.name}
                    {item.href == "/shop/cart" && cart.length > 0 && (
                      <div>{totalItems}</div>
                    )}
                  </NavLink>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
