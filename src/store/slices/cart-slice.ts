import { createSlice } from "@reduxjs/toolkit";
import type { ProductType } from "../../lib/types";

interface CartState {
  cart: Array<{
    product: ProductType;
    customizations: Array<{ color: string; size: string; qty: number }>;
  }>;
}

const initialState: CartState = {
  cart: [],
};

const CART_KEY = "cart-data";

export const cartSlice = createSlice({
  name: "cart-slice",
  initialState: initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isAlreadyinCart = state.cart.find(
        ({ product }) => product.id === payload.product.id,
      );
      if (!isAlreadyinCart)
        state.cart = [
          {
            product: payload.product,
            customizations: [{ ...payload.customization, qty: 1 }],
          },
          ...state.cart,
        ];
      else {
        state.cart = state.cart.map((item) => {
          if (item.product.id === payload.product.id) {
            return {
              ...item,
              customizations: [
                ...item.customizations,
                {
                  ...payload.customization,
                  qty: 1,
                },
              ],
            };
          }
          return item;
        });
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    incrementProductInCart: (state, { payload }) => {
      const { product } = payload;
      state.cart = state.cart.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            customizations: item.customizations.map((customization) => {
              if (
                customization.color === product.color &&
                customization.size === product.size
              ) {
                return {
                  ...customization,
                  qty: customization.qty + 1,
                };
              }
              return customization;
            }),
          };
        } else return item;
      });
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    decrementProductInCart: (state, { payload }) => {
      const { product } = payload;
      state.cart = state.cart.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            customizations: item.customizations.map((customization) => {
              if (
                customization.color === product.color &&
                customization.size === product.size
              ) {
                return {
                  ...customization,
                  qty: customization.qty - 1,
                };
              }
              return customization;
            }),
          };
        } else return item;
      });
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    removeProductFromCart: (state, { payload }) => {
      state.cart = state.cart.map((data) => {
        if (data.product.id === payload.id) {
          return {
            ...data,
            customizations: data.customizations.filter(
              ({ color, size }) =>
                !(color === payload.color && size === payload.size),
            ),
          };
        }
        return data;
      });
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem(CART_KEY);
    },
    loadCartDataFromLocalStorage: (state) => {
      const cartLocalData = localStorage.getItem(CART_KEY);
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
  removeProductFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
