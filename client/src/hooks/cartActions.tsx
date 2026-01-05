import { use, useEffect, useState } from "react";
import { CartContext } from "../context/CartReducerActions.tsx";
import { Cart } from "../utils/types";
import {
  addProductToCart,
  decrementProductQuantity,
  deleteFromCart,
  getCart,
  incrementProductQuantity,
} from "../api/cart.js";

// export default function useCartActions() {
//   const context = use(CartContext);

//   if (!context) {
//     throw new Error("useCartActions must be used within a provider");
//   }

//   return context;
// }

export default function useCartActions() {
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    async function getProductsInCart() {
      try {
        const { data } = await getCart();
        setCart(data);
        console.log(data);
      } catch (error: any) {
        throw new Error("Error fetching products in cart " + error.message);
      }
    }
    getProductsInCart();
  }, []);

  async function addProduct(id: number | string) {
    const findedProductInCart = cart.find((product) => product.id === id);
    console.log(findedProductInCart);
    const { product_id } = findedProductInCart;

    if (findedProductInCart) {
      try {
        const { data } = await incrementProductQuantity(product_id);
        setCart(data);
      } catch (error: any) {
        throw new Error("Error updating quantity " + error.message);
      }
    } else {
      try {
        const { data } = await addProductToCart(id);
        setCart(data);
      } catch (error: any) {
        throw new Error("Error adding product to cart " + error.message);
      }
    }
  }

  async function decrementQuantity(id: number | string) {
    const findedProductInCart = cart.find((product) => product.id === id);

    if (findedProductInCart) {
      try {
        const { data } = await decrementProductQuantity(id);
        setCart(data);
      } catch (error: any) {
        throw new Error("Error decrementing product quantity " + error.message);
      }
    }
  }

  async function deleteProductFromCart(id: number | string) {
    const findedProductInCart = cart.find((product) => product.id === id);

    if (findedProductInCart) {
      try {
        await deleteFromCart(id);
      } catch (error: any) {
        throw new Error("Error deleting product from cart " + error.message);
      }
    }
  }

  return { cart, addProduct, decrementQuantity, deleteProductFromCart };
}
