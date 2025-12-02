const Product = require("../models/Product");

// GET api/products

const getProducts = async (req, res) => {
  try {
    const { search, category, size, minPrice, maxPrice } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    // search name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // category
    if (category) {
      filter.category = category;
    }

    // Size filter (sizes array must contain this size)

    if (size) {
      filter.sizes = size;
    }

    // price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    console.log(filter);

    // query to db

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/products/:id

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Get product by id error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProductById,
  getProducts,
};
