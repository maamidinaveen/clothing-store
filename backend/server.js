const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/authMiddleware");

const productRoutes = require("./routes/productRoutes");
const { logoutUser } = require("./controllers/authController");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// TEST ROUTE

app.get("/ping", authMiddleware, (req, res) => {
  res.json({ message: "hello world" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.post("/logout", logoutUser);

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
