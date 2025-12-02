// backend/server.js

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
      // later add your deployed frontend:
      "https://clothing-store-xqb9.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// simple test route (no auth)
app.get("/ping", (req, res) => {
  res.json({ message: "hello world" });
});

// optional protected test route
app.get("/protected-ping", authMiddleware, (req, res) => {
  res.json({ message: "protected pong", user: req.user });
});

// main routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.post("/logout", logoutUser);
app.use("/api/orders", orderRoutes);

// 🔥 start server only after DB connects, and CRASH if it fails
const startServer = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await connectDB();
    console.log("✅ DB connected, starting server...");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    // rethrow so Node exits with non-zero and Koyeb shows the real error
    throw err;
  }
};

startServer();

module.exports = app;
