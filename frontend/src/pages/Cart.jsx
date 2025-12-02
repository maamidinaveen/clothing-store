import React, { Component } from "react";

class Cart extends Component {
  state = {
    cart: [],
    total: 0,
  };

  componentDidMount() {
    this.loadCart();
  }

  loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]").map(
      (item) => ({
        ...item,
        qty: item.qty || 1, // default qty = 1
      })
    );

    const total = this.calculateTotal(cart);
    this.setState({ cart, total });
  };

  calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  };

  updateCartAndTotal = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const total = this.calculateTotal(cart);
    this.setState({ cart, total });
  };

  handleQtyChange = (index, delta) => {
    const cart = [...this.state.cart];
    const current = cart[index];

    const newQty = (current.qty || 1) + delta;

    if (newQty <= 0) {
      // remove item if qty becomes 0 or less
      cart.splice(index, 1);
    } else {
      cart[index] = { ...current, qty: newQty };
    }

    this.updateCartAndTotal(cart);
  };

  handleRemove = (index) => {
    const cart = [...this.state.cart];
    cart.splice(index, 1);
    this.updateCartAndTotal(cart);
  };

  goToCheckout = () => {
    if (this.state.cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    window.location.href = "/checkout";
  };

  render() {
    const { cart, total } = this.state;

    return (
      <div style={{ maxWidth: 700, margin: "30px auto" }}>
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{item.name}</strong> <br />
                  Size: {item.size || "-"} <br />
                  Price: ₹{item.price}
                </div>

                <div>
                  Qty:{" "}
                  <button
                    type="button"
                    onClick={() => this.handleQtyChange(index, -1)}
                    style={{ marginRight: 5 }}
                  >
                    -
                  </button>
                  <span>{item.qty || 1}</span>
                  <button
                    type="button"
                    onClick={() => this.handleQtyChange(index, +1)}
                    style={{ marginLeft: 5 }}
                  >
                    +
                  </button>
                </div>

                <div>
                  Subtotal: ₹{(item.qty || 1) * item.price}
                  <br />
                  <button
                    type="button"
                    onClick={() => this.handleRemove(index)}
                    style={{ marginTop: 5 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <button type="button" onClick={this.goToCheckout}>
              Go to Checkout
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Cart;
