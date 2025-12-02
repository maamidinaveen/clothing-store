import React, { Component } from "react";
import api from "../services/api";
import Filters from "../components/Filters";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {
    products: [],
    loading: false,
    error: "",
    page: 1,
    totalPages: 1,
    limit: 6,
    // filters
    search: "",
    category: "",
    size: "",
    minPrice: "",
    maxPrice: "",
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    this.setState({ loading: true, error: "" });

    const { page, limit, search, category, size, minPrice, maxPrice } =
      this.state;

    try {
      const res = await api.get("/products", {
        params: {
          page,
          limit,
          search: search || undefined,
          category: category || undefined,
          size: size || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        },
      });

      this.setState({
        products: res.data.products,
        totalPages: res.data.totalPages || 1,
      });
    } catch (err) {
      console.error("Products load error:", err);
      const msg = err.response?.data?.message || "Failed to load products";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  // when Filters.jsx calls onApply
  handleApplyFilters = (filters) => {
    this.setState(
      {
        search: filters.search || "",
        category: filters.category || "",
        size: filters.size || "",
        minPrice: filters.minPrice || "",
        maxPrice: filters.maxPrice || "",
        page: 1, // reset to first page when filters change
      },
      () => {
        this.loadProducts();
      }
    );
  };

  handlePageChange = (newPage) => {
    const { totalPages } = this.state;
    if (newPage < 1 || newPage > totalPages) return;

    this.setState({ page: newPage }, () => {
      this.loadProducts();
    });
  };

  render() {
    const { products, loading, error, page, totalPages } = this.state;

    return (
      <div style={{ maxWidth: 1000, margin: "20px auto" }}>
        <h1>Products</h1>

        {/* Filters */}
        <Filters onApply={this.handleApplyFilters} />

        {/* Error / loading */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading...</p>}

        {/* Products list */}
        {!loading && products.length === 0 && !error && (
          <p>No products found.</p>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            marginTop: 10,
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                width: 220,
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: "100%", height: 140, objectFit: "cover" }}
              />
              <h3 style={{ fontSize: 16 }}>{p.name}</h3>
              <p>₹{p.price}</p>
              <p style={{ fontSize: 12 }}>{p.category}</p>
              <Link to={`/product/${p._id}`}>View Details</Link>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => this.handlePageChange(page - 1)}
              disabled={page === 1}
              style={{ marginRight: 10 }}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => this.handlePageChange(page + 1)}
              disabled={page === totalPages}
              style={{ marginLeft: 10 }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Products;
