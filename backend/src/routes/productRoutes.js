import express from "express";
import { getAllProducts, getProductBySlug } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts); // GET /api/products
router.get("/:slug", getProductBySlug); // GET /api/products/:slug

export default router;
