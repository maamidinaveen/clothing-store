import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

class Home extends Component {
  state = {
    featured: [],
  };

  async componentDidMount() {
    try {
      // get some products and show first 3 as "featured"
      const res = await api.get("/products");
      const products = res.data.products || [];
      this.setState({ featured: products.slice(0, 3) });
    } catch (err) {
      console.error("Error loading featured products:", err.message);
    }
  }

  render() {
    const { featured } = this.state;

    return (
      <div style={{ maxWidth: 900, margin: "30px auto" }}>
        {/* Hero section */}
        <div style={{ marginBottom: 30, textAlign: "center" }}>
          <h1>Welcome to Clothing Store</h1>
          <p style={{ fontSize: 18, marginTop: 10 }}>
            Shop the latest T-Shirts, Hoodies, Jeans and more for Men, Women and
            Kids.
          </p>

          <Link to="/products">
            <button
              style={{
                marginTop: 20,
                padding: "10px 20px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </Link>
        </div>

        {/* Featured products */}
        <div>
          <h2>Featured Products</h2>
          {featured.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                marginTop: 15,
              }}
            >
              {featured.map((p) => (
                <div
                  key={p._id}
                  style={{
                    border: "1px solid #ddd",
                    padding: 10,
                    width: 250,
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", height: 150, objectFit: "cover" }}
                  />
                  <h3 style={{ fontSize: 18 }}>{p.name}</h3>
                  <p>₹{p.price}</p>
                  <Link to={`/product/${p._id}`}>View Details</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
