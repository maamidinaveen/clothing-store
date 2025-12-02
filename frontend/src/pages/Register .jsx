import React, { Component } from "react";
import api from "../services/api";

class Register extends Component {
  state = {
    name: "",
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
      const { name, email, password } = this.state;

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role: "customer",
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registered successfully!");

      // after register, go to products page
      window.location.href = "/products";
    } catch (err) {
      const msg = err.response?.data?.message || "Register failed";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, email, password, error, loading } = this.state;

    return (
      <div style={{ maxWidth: 400, margin: "40px auto" }}>
        <h2>Register</h2>

        {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>

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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    );
  }
}

export default Register;
