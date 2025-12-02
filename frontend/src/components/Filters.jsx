import React, { Component } from "react";

class Filters extends Component {
  state = {
    search: "",
    category: "",
    size: "",
    minPrice: "",
    maxPrice: "",
  };

  // when any input changes
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // when "Apply Filters" button is clicked
  handleApply = () => {
    if (this.props.onApply) {
      this.props.onApply(this.state); // send all filter values to parent
    }
  };

  // optional: Clear filters
  handleClear = () => {
    const cleared = {
      search: "",
      category: "",
      size: "",
      minPrice: "",
      maxPrice: "",
    };
    this.setState(cleared);
    if (this.props.onApply) {
      this.props.onApply(cleared);
    }
  };

  render() {
    const { search, category, size, minPrice, maxPrice } = this.state;

    return (
      <div
        style={{
          border: "1px solid #ddd",
          padding: 10,
          marginBottom: 20,
        }}
      >
        <h3>Filters</h3>

        <div style={{ marginBottom: 8 }}>
          <label>Search</label>
          <br />
          <input
            type="text"
            name="search"
            value={search}
            onChange={this.handleChange}
            placeholder="Search by name or description"
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Category</label>
          <br />
          <select name="category" value={category} onChange={this.handleChange}>
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Size</label>
          <br />
          <select name="size" value={size} onChange={this.handleChange}>
            <option value="">All</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Min Price</label>
          <br />
          <input
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={this.handleChange}
            placeholder="e.g. 400"
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Max Price</label>
          <br />
          <input
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={this.handleChange}
            placeholder="e.g. 1500"
          />
        </div>

        <button onClick={this.handleApply} style={{ marginRight: 10 }}>
          Apply Filters
        </button>
        <button onClick={this.handleClear}>Clear</button>
      </div>
    );
  }
}

export default Filters;
