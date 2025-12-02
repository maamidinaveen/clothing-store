const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Helper: find or create cart for user
const findOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  return cart;
};

// GET /api/cart
// Get logged-in user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image category sizes"
    );

    if (!cart) {
      return res.json({ items: [], totalItems: 0 });
    }

    const totalItems = cart.items.reduce((sum, item) => sum + item.qty, 0);

    res.json({
      items: cart.items,
      totalItems,
    });
  } catch (err) {
    console.error("Get cart error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/cart/add
// Body: { productId, size, qty }
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, qty = 1 } = req.body;

    if (!productId || !size) {
      return res
        .status(400)
        .json({ message: "productId and size are required" });
    }

    // optional: check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Invalid product" });
    }

    const cart = await findOrCreateCart(userId);

    // check if item already exists (same product & size)
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({
        product: productId,
        size,
        qty,
      });
    }

    await cart.save();

    const populatedCart = await cart.populate(
      "items.product",
      "name price image category sizes"
    );

    res.status(200).json({
      message: "Item added to cart",
      cart: populatedCart,
    });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/cart/update
// Body: { productId, size, qty }
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, qty } = req.body;

    if (!productId || !size || qty == null) {
      return res
        .status(400)
        .json({ message: "productId, size and qty are required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (qty <= 0) {
      // remove item if new qty is 0 or less
      cart.items = cart.items.filter(
        (item) => !(item.product.toString() === productId && item.size === size)
      );
    } else {
      item.qty = qty;
    }

    await cart.save();

    const populatedCart = await cart.populate(
      "items.product",
      "name price image category sizes"
    );

    res.json({
      message: "Cart updated",
      cart: populatedCart,
    });
  } catch (err) {
    console.error("Update cart error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/cart/remove
// Body: { productId, size }
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res
        .status(400)
        .json({ message: "productId and size are required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size)
    );

    await cart.save();

    const populatedCart = await cart.populate(
      "items.product",
      "name price image category sizes"
    );

    res.json({
      message: "Item removed from cart",
      cart: populatedCart,
    });
  } catch (err) {
    console.error("Remove from cart error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
