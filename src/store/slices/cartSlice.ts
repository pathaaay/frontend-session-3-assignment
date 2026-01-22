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
      if (!isAlreadyinCart) state.cart = [{ ...payload }, ...state.cart];
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
      localStorage.setItem("cart-data", JSON.stringify(state.cart));
    },
    incrementProductInCart: (state, { payload }) => {
      state.cart = state.cart.map((item, i) => {
        if (i === payload) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart-data", JSON.stringify(state.cart));
    },
    decrementProductInCart: (state, { payload }) => {
      state.cart = state.cart.map((item, i) => {
        if (i === payload) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart-data", JSON.stringify(state.cart));
    },
    removeProductFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((_, i) => i !== payload);
      localStorage.setItem("cart-data", JSON.stringify(state.cart));
    },
    loadCartDataFromLocalStorage: (state) => {
      const cartLocalData = localStorage.getItem("cart-data");
      if (cartLocalData) {
        const parsedCartData = JSON.parse(cartLocalData);
        state.cart = parsedCartData;
      }
    },
  },
});

export const {
  addToCart,
  loadCartDataFromLocalStorage,
  incrementProductInCart,
  decrementProductInCart,
  removeProductFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
