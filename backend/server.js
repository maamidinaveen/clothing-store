const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const { logoutUser } = require("./controllers/authController");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      // add your deployed frontend URL here later, e.g.:
      // "https://your-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.post("/logout", logoutUser);
app.use("/api/orders", orderRoutes);

// 🔥 Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB or start server:", err.message);
  }
};

startServer();

module.exports = app;
