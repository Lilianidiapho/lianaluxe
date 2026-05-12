import express from "express";
import { getProducts, addProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product-controller.js";
import uploads from "../middlewares/file-upload.js";
import { protect, admin } from "../middlewares/auth-middleware.js";

//configure router
const router = express.Router();

//GET route
router.get("/products", getProducts);
router.get("/product/:id", getProductById);

//POST route
router.post("/product", protect, admin, uploads.array("images", 10), addProducts);

//PUT route
router.put("/product/:id", protect, admin, uploads.array("images", 10), updateProduct);

//DELETE route
router.delete("/product/:id", protect, admin, deleteProduct);

export default router;