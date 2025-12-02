import React, { Component } from "react";
import { useParams } from "react-router-dom";

class OrderSuccessClass extends Component {
  render() {
    const { orderId } = this.props;

    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h1>🎉 Order Placed Successfully!</h1>

        <p style={{ fontSize: 18, marginTop: 20 }}>
          Thank you for shopping with us.
        </p>

        <p style={{ fontSize: 18 }}>
          <strong>Your Order ID:</strong> {orderId}
        </p>

        <p style={{ marginTop: 20 }}>
          A confirmation email has been sent to your registered email address.
        </p>

        <button
          onClick={() => (window.location.href = "/products")}
          style={{
            marginTop: 30,
            padding: "10px 20px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }
}

export default function OrderSuccess() {
  const { id } = useParams();
  return <OrderSuccessClass orderId={id} />;
}
