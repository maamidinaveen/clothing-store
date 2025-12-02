import React, { Component } from "react";

import api from "../services/api";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, error: "" });

    try {
      const { email, password } = this.state;

      const res = await api.post("/auth/login", { email, password });

      // optional: store user in localStorage, helpful on frontend
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Logged in successfully!");
      window.location.href = "/products"; // go to products after login
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div style={{ maxWidth: 400, margin: "40px auto" }}>
        <h2>Login</h2>

        {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          Don&apos;t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    );
  }
}

export default Login;
