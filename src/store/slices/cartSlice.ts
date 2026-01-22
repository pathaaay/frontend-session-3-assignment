import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  cart: Array<{
    productId: number;
    customization: { color: string; size: string };
    qty: number;
  }>;
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart-slice",
  initialState: initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isAlreadyinCart = state.cart.find(
        ({ productId, customization }) =>
          productId === payload.productId &&
          JSON.stringify(customization) ===
            JSON.stringify(payload.customization),
      );
      if (!isAlreadyinCart) state.cart = [{ ...payload }];
      else {
        state.cart = state.cart.map((item) => {
          if (
            item.productId === payload.productId &&
            JSON.stringify(item.customization) ===
              JSON.stringify(payload.customization)
          ) {
            return {
              ...item,
              qty: item.qty + payload.qty,
            };
          }
          return item;
        });
      }
    },
    
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
