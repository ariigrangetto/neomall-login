import { Router } from "express";
import {
  getAllProducts,
  getProductById,
} from "../controller/productController.js";

const productsRoutes = Router();

productsRoutes.get("/", getAllProducts);
productsRoutes.get("/:id", getProductById);

export default productsRoutes;
