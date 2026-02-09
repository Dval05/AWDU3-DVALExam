import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/computerstore/products');
      const data = await response.json();
      setAvailableProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleSelectProduct = (product) => {
    if (selectedProducts.find(p => p._id === product._id)) {
      alert('Product already added');
      return;
    }

    setSelectedProducts([...selectedProducts, product]);
    setSearchTerm('');
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p._id !== productId));
  };

  const calculateProductIVA = (price) => {
    return price * 0.15;
  };

  const calculateTotalIVA = () => {
    return selectedProducts.reduce((sum, product) => sum + calculateProductIVA(product.price), 0);
  };

  const filteredProducts = availableProducts.filter(product =>
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="invoice-container">
        <div className="invoice-header">
          <h1>INVOICE - DANNA COMPUTERS</h1>
          <p className="subtitle">Billing System with 15% IVA</p>
        </div>

        <div className="product-form">
          <h2>Search & Select Product</h2>
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by brand or model..."
              className="input-field"
            />
          </div>

          {searchTerm && (
            <div className="product-dropdown">
              {loading ? (
                <p className="loading-text">Loading products...</p>
              ) : filteredProducts.length > 0 ? (
                <ul className="product-list">
                  {filteredProducts.map(product => (
                    <li 
                      key={product._id} 
                      onClick={() => handleSelectProduct(product)}
                      className="product-item"
                    >
                      <span className="product-name">
                        {product.brand} {product.model}
                      </span>
                      <span className="product-price">${product.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-results">No products found</p>
              )}
            </div>
          )}
        </div>

        <div className="products-list">
          <h2>Selected Products</h2>
          
          {selectedProducts.length === 0 ? (
            <div className="empty-message">
              <p>No products selected. Search and add products.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>IVA (15%)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.brand} {product.model}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>${calculateProductIVA(product.price).toFixed(2)}</td>
                      <td>
                        <button 
                          onClick={() => handleRemoveProduct(product._id)}
                          className="btn-remove"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedProducts.length > 0 && (
          <div className="calculations">
            <div className="calc-row iva-highlight">
              <span>TOTAL IVA (15%):</span>
              <span className="iva-value">${calculateTotalIVA().toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="info-footer">
          <p>Products selected: <strong>{selectedProducts.length}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default App;
