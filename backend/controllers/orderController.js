const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const sendOrderEmail = require("../utils/sendEmail");

// POST /api/orders
// Create order from user's cart, clear cart, send email
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const userName = req.user.name;

    //  Get user's cart with product details
    let cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price stock"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate stock (optional bonus)
    for (const item of cart.items) {
      if (item.product.stock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${item.product.name}. Available: ${item.product.stock}`,
        });
      }
    }

    //  Build order items + calculate total price
    let totalPrice = 0;

    const orderItems = cart.items.map((item) => {
      const itemTotal = item.product.price * item.qty;
      totalPrice += itemTotal;

      return {
        product: item.product._id,
        name: item.product.name,
        size: item.size,
        qty: item.qty,
        price: item.product.price,
      };
    });

    //  Create order document
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      status: "Pending", // or "Confirmed"
      orderDate: new Date(),
    });

    //  Clear user's cart
    cart.items = [];
    await cart.save();

    //  Send confirmation email (using Nodemailer)
    try {
      const orderDate = order.orderDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });

      const itemsText = orderItems
        .map(
          (item) =>
            `- ${item.name} (Size: ${item.size}) x ${item.qty} @ ₹${item.price}`
        )
        .join("\n");

      const emailText = `
Hi ${userName || "Customer"},

Thank you for your order!

Order ID: ${order._id}
Order Date: ${orderDate}

Order Summary:
${itemsText}

Total: ₹${totalPrice}

We will process your order shortly.

Regards,
Clothing Store
`;

      await sendOrderEmail({
        to: userEmail,
        subject: `Order Confirmation - ${order._id}`,
        text: emailText,
      });
    } catch (emailErr) {
      console.error("Error sending order email:", emailErr.message);
      // Don't fail the whole request just because email failed
    }

    // 8. Respond to client
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("Create order error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOrder };
