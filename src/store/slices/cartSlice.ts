import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  cart: Array<{ id: number; qty: number }>;
}

const initialState: CartState = {
  cart: [{ id: 1, qty: 9 }],
};

export const cartSlice = createSlice({
  name: "cart-slice",
  initialState: initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      console.log({ payload });
      state.cart = [{ id: 2, qty: 4 }];
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
