const express = require("express");
const { createOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/orders
router.post("/", authMiddleware, createOrder);

module.exports = router;
