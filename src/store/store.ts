import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../redux/root-reducer";

export const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
