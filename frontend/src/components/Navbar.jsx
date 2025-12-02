import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    user: null,
    cartCount: 0,
  };

  componentDidMount() {
    this.loadUser();
    this.loadCart();
  }

  loadUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.setState({ user: JSON.parse(savedUser) });
    }
  };

  loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = savedCart.reduce((sum, item) => sum + (item.qty || 1), 0);
    this.setState({ cartCount: count });
  };

  handleLogout = () => {
    // remove user info on frontend
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.href = "/login";
  };

  render() {
    const { user, cartCount } = this.state;

    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          marginBottom: 20,
        }}
      >
        {/* Left - Brand */}
        <div>
          <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
            Clothing Store
          </Link>
        </div>

        {/* Middle - Links */}
        <div style={{ display: "flex", gap: 15 }}>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </div>

        {/* Right - Auth */}
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 10 }}>
                Hello, {user.name || user.email}
              </span>
              <button onClick={this.handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 10 }}>
                Login
              </Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
