import { useSelector } from "react-redux";
import type { RootState } from "../redux/rootReducer";

export const useCart = () => useSelector((state: RootState) => state.cart);
