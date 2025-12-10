import type { Product } from "../utils/types.d.ts";
import { CartActionType } from "../utils/types.d.ts";

export type CartProduct = Product & {
  quantity: number;
};

export type CartState = CartProduct[];

type ACTIONTYPE =
  | { type: CartActionType.ADD_TO_CART; payload: Product }
  | { type: CartActionType.REMOVE_FROM_CART; payload: number }
  | { type: CartActionType.CLEAR_CART };

export const CartInitialState = JSON.parse(
  window.localStorage.getItem("cartProducts") || "[]"
);

const updateLocalStorage = (state: CartState) => {
  window.localStorage.setItem("cartProducts", JSON.stringify(state));
};

export default function CartActions(state: CartState, action: ACTIONTYPE) {
  switch (action.type) {
    case CartActionType.ADD_TO_CART: {
      //extrayendo solo la propiedad id;
      const { id } = action.payload;

      const findProduct = state.findIndex((product) => product.id === id);
      if (findProduct >= 0) {
        const newState = structuredClone(state);
        newState[findProduct].quantity += 1;
        updateLocalStorage(newState);
        return newState;
      }

      const newState = [...state, { ...action.payload, quantity: 1 }];
      updateLocalStorage(newState);
      return newState;
    }

    case CartActionType.REMOVE_FROM_CART: {
      const id = action.payload;
      const newState = state.filter((product) => product.id !== id);
      updateLocalStorage(newState);
      return newState;
    }

    case CartActionType.CLEAR_CART: {
      updateLocalStorage([]);
      return [];
    }
  }
  return state;
}
