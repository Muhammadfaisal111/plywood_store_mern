import express from "express";
const router = express.Router();

import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";


// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);


// Private routes
router.post("/", protect, createProduct);
router.delete("/:id", protect, deleteProduct);


export default router;
