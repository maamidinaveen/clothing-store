const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/delete", authMiddleware, removeFromCart);

module.exports = router;
