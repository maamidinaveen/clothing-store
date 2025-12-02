// backend/seedProducts.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

// --- 1. Array of 20+ demo products ---
const products = [
  {
    name: "Classic Men's T-Shirt",
    description: "Soft cotton T-Shirt perfect for everyday wear.",
    price: 499,
    image: "https://via.placeholder.com/300x300.png?text=T-Shirt",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },
  {
    name: "Men's Hoodie",
    description: "Warm and comfortable winter hoodie.",
    price: 999,
    image: "https://via.placeholder.com/300x300.png?text=Hoodie",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20,
  },
  {
    name: "Men's Slim Fit Jeans",
    description: "Stylish jeans with stretchable fabric.",
    price: 1299,
    image: "https://via.placeholder.com/300x300.png?text=Jeans",
    category: "Men",
    sizes: ["S", "M", "L"],
    stock: 18,
  },
  {
    name: "Women's Floral Dress",
    description: "Beautiful floral print casual dress.",
    price: 899,
    image: "https://via.placeholder.com/300x300.png?text=Dress",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 15,
  },
  {
    name: "Women's Denim Jacket",
    description: "Trendy denim jacket for stylish outings.",
    price: 1499,
    image: "https://via.placeholder.com/300x300.png?text=Jacket",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
  },
  {
    name: "Women's Leggings",
    description: "Comfortable stretch leggings.",
    price: 499,
    image: "https://via.placeholder.com/300x300.png?text=Leggings",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 30,
  },
  {
    name: "Kids' T-Shirt",
    description: "Colorful and soft cotton T-shirt for kids.",
    price: 299,
    image: "https://via.placeholder.com/300x300.png?text=Kids+T-Shirt",
    category: "Kids",
    sizes: ["S", "M"],
    stock: 40,
  },
  {
    name: "Kids' Hoodie",
    description: "Warm hoodie for children in winters.",
    price: 699,
    image: "https://via.placeholder.com/300x300.png?text=Kids+Hoodie",
    category: "Kids",
    sizes: ["M", "L"],
    stock: 28,
  },
  {
    name: "Kids' Joggers",
    description: "Comfortable joggers for daily wear.",
    price: 549,
    image: "https://via.placeholder.com/300x300.png?text=Joggers",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 22,
  },

  // --- More items for total 20+ ---
  {
    name: "Men's Casual Shirt",
    description: "Cotton casual shirt perfect for outings.",
    price: 799,
    image: "https://via.placeholder.com/300x300.png?text=Shirt",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20,
  },
  {
    name: "Men's Sports Shorts",
    description: "Dry-fit shorts ideal for workouts.",
    price: 499,
    image: "https://via.placeholder.com/300x300.png?text=Shorts",
    category: "Men",
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  {
    name: "Women's Kurti",
    description: "Traditional printed long kurti.",
    price: 699,
    image: "https://via.placeholder.com/300x300.png?text=Kurti",
    category: "Women",
    sizes: ["M", "L", "XL"],
    stock: 25,
  },
  {
    name: "Women's Skirt",
    description: "Stylish flared skirt.",
    price: 599,
    image: "https://via.placeholder.com/300x300.png?text=Skirt",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 18,
  },
  {
    name: "Women's Winter Coat",
    description: "Warm and fashionable winter coat.",
    price: 1999,
    image: "https://via.placeholder.com/300x300.png?text=Coat",
    category: "Women",
    sizes: ["M", "L"],
    stock: 10,
  },
  {
    name: "Kids' Shorts",
    description: "Comfortable shorts for children.",
    price: 350,
    image: "https://via.placeholder.com/300x300.png?text=Kids+Shorts",
    category: "Kids",
    sizes: ["S", "M"],
    stock: 30,
  },
  {
    name: "Kids' Jacket",
    description: "Soft winter jacket for kids.",
    price: 899,
    image: "https://via.placeholder.com/300x300.png?text=Kids+Jacket",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 14,
  },
  {
    name: "Kids' Denim Jeans",
    description: "Durable jeans for growing kids.",
    price: 650,
    image: "https://via.placeholder.com/300x300.png?text=Kids+Jeans",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 18,
  },
  {
    name: "Men's Formal Pants",
    description: "Slim fit formal trousers.",
    price: 1199,
    image: "https://via.placeholder.com/300x300.png?text=Formal+Pants",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20,
  },
  {
    name: "Men's Jacket",
    description: "Perfect for winter and casual outings.",
    price: 1799,
    image: "https://via.placeholder.com/300x300.png?text=Jacket",
    category: "Men",
    sizes: ["M", "L"],
    stock: 15,
  },
];

const seedData = async () => {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
    console.log("📥 Inserting new products...");

    await Product.insertMany(products);
    console.log("🎉 20+ Products seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    process.exit();
  }
};

seedData();
