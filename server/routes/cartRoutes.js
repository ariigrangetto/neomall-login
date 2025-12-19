import { Router } from "express";
import {
  getAllProductsInCart,
  addProductById,
  deleteFromCartById,
  incrementQuantity,
  decrementQuantity,
} from "../controller/cartController.js";
import { validateToken } from "../middlewares/validateToken.js";

const cartRoute = Router();

cartRoute.get("/", validateToken, getAllProductsInCart);
cartRoute.post("/", validateToken, addProductById);
cartRoute.delete("/:id", validateToken, deleteFromCartById);
cartRoute.patch("/increment/:id", validateToken, incrementQuantity);
cartRoute.patch("/decrement/:id", validateToken, decrementQuantity);

export default cartRoute;
