import React, { Component } from "react";

import api from "../services/api";

class Checkout extends Component {
  state = {
    cart: [],
    total: 0,
    loading: false,
    error: "",
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.qty || 1),
      0
    );
    this.setState({ cart, total });
  }

  placeOrder = async () => {
    const { cart } = this.state;

    // 1) Check login
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login before checkout");
      window.location.href = "/login";
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    this.setState({ loading: true, error: "" });

    try {
      // 2) Send all cart items to backend cart
      //    (so backend Cart collection is updated for this user)
      for (const item of cart) {
        await api.post("/cart/add", {
          productId: item._id,
          size: item.size,
          qty: item.qty || 1,
        });
      }

      // 3) Create order from backend cart
      const res = await api.post("/orders"); // no body needed
      const order = res.data.order;

      // 4) Clear local cart
      localStorage.removeItem("cart");

      alert("Order placed successfully!");

      // 5) Redirect to order success page
      window.location.href = `/order-success/${order._id}`;
    } catch (err) {
      console.error("Checkout error:", err);
      const msg = err.response?.data?.message || "Checkout failed";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { cart, total, loading, error } = this.state;

    return (
      <div style={{ maxWidth: 600, margin: "30px auto" }}>
        <h2>Checkout</h2>

        {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <h3>Order Summary</h3>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <strong>{item.name}</strong> <br />
                Size: {item.size || "-"} <br />
                Qty: {item.qty || 1} <br />
                Price: ₹{item.price} <br />
                Subtotal: ₹{(item.qty || 1) * item.price}
              </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <button onClick={this.placeOrder} disabled={loading}>
              {loading ? "Placing order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Checkout;
