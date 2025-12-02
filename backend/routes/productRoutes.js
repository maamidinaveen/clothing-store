const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);

module.exports = router;
