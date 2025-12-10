import { use } from "react";
import { CartContext } from "../context/CartReducerActions.tsx";

export default function useCartActions() {
  const context = use(CartContext);

  if (!context) {
    throw new Error("useCartActions must be used within a provider");
  }

  return context;
}
