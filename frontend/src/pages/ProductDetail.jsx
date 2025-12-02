import React, { Component } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

class ProductDetailClass extends Component {
  state = {
    product: null,
    size: "",
    qty: 1,
    loading: false,
    error: "",
  };

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = async () => {
    const { id } = this.props; // from wrapper
    this.setState({ loading: true, error: "" });

    try {
      const res = await api.get(`/products/${id}`);
      this.setState({ product: res.data });
    } catch (err) {
      console.error("Product detail error:", err);
      const msg =
        err.response?.data?.message || "Failed to load product details";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleAddToCart = async () => {
    const { product, size, qty } = this.state;

    if (!product) return;

    if (!size) {
      alert("Please select a size");
      return;
    }

    // read existing cart
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");

    // check if same product + size already in cart
    const index = existing.findIndex(
      (item) => item._id === product._id && item.size === size
    );

    if (index >= 0) {
      // update qty
      existing[index].qty = (existing[index].qty || 1) + Number(qty || 1);
    } else {
      // add new item
      existing.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        size,
        qty: Number(qty || 1),
      });
    }

    localStorage.setItem("cart", JSON.stringify(existing));

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        await api.post("/cart/add", {
          productId: product._id,
          size,
          qty: Number(qty || 1),
        });
        // optional: console.log("Synced to backend cart");
      } catch (err) {
        console.error("Error syncing cart to backend:", err);
        // we don't block UI if this fails
      }
    }

    alert("Added to cart!");
  };

  render() {
    const { product, size, qty, loading, error } = this.state;

    if (loading) {
      return <p style={{ margin: 20 }}>Loading product...</p>;
    }

    if (error) {
      return <p style={{ margin: 20, color: "red" }}>{error}</p>;
    }

    if (!product) {
      return <p style={{ margin: 20 }}>Product not found.</p>;
    }

    return (
      <div
        style={{ maxWidth: 800, margin: "30px auto", display: "flex", gap: 20 }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h2>{product.name}</h2>
          <p style={{ fontSize: 18 }}>₹{product.price}</p>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>

          {/* Size selection */}
          <div style={{ marginTop: 15 }}>
            <label>Select Size:</label>
            <br />
            <select
              value={size}
              onChange={(e) => this.setState({ size: e.target.value })}
            >
              <option value="">Select size</option>
              {product.sizes &&
                product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>

          {/* Quantity */}
          <div style={{ marginTop: 10 }}>
            <label>Quantity:</label>
            <br />
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => this.setState({ qty: e.target.value })}
              style={{ width: 60 }}
            />
          </div>

          <button
            onClick={this.handleAddToCart}
            style={{ marginTop: 20, padding: "8px 16px", cursor: "pointer" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

// Wrapper to use useParams with class component
export default function ProductDetail() {
  const { id } = useParams();
  return <ProductDetailClass id={id} />;
}
