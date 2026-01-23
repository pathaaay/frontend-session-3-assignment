import { useSelector } from "react-redux";
import type { RootState } from "../redux/root-reducer";

export const useCart = () => useSelector((state: RootState) => state.cart);
