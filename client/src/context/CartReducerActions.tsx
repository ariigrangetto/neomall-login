import { createContext, useReducer } from "react";
import CartActions, {
  CartInitialState,
  type CartState,
} from "../reducer/cartActions.tsx";
import { CartActionType, type Product } from "../utils/types.d.ts";

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export default function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(CartActions, CartInitialState);

  const addToCart = (product: Product) => {
    dispatch({
      type: CartActionType.ADD_TO_CART,
      payload: product,
    });
  };

  const removeFromCart = (id: number) => {
    dispatch({
      type: CartActionType.REMOVE_FROM_CART,
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: CartActionType.CLEAR_CART,
    });
  };

  return (
    <CartContext value={{ addToCart, cart: state, removeFromCart, clearCart }}>
      {children}
    </CartContext>
  );
}
