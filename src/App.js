import React, { useState } from 'react';
import './App.css';
import iPhone14 from './assets/iPhone14.png'
import iPhone14Plus from './assets/iPhone14Plus.png'
import iPhone14Pro from './assets/iPhone14Pro.png'
import iPhone14ProMax from './assets/iPhone14ProMax.png'

const products = [
  {
    name: 'iPhone 14 Pro Max',
    price: 1499,
    features: ['6.7-inch Super Retina XDR display', 'A16 Bionic chip'],
    image: iPhone14ProMax ,
  },
  {
    name: 'iPhone 14 Pro',
    price: 1299,
    features: ['6.1-inch Super Retina XDR display', 'A16 Bionic chip'],
    image: iPhone14Pro ,
  },
  {
    name: 'iPhone 14 Plus',
    price: 1099,
    features: ['6.1-inch Super Retina XDR display', 'A16 Bionic chip'],
    image: iPhone14Plus ,
  },
  {
    name: 'iPhone 14',
    price: 999,
    features: ['5.4-inch Super Retina XDR display', 'A16 Bionic chip'],
    image: iPhone14 ,
  },
];

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, quantity) => {
    const itemIndex = cart.findIndex((item) => item.name === product.name);
    if (itemIndex === -1) {
      setCart([...cart, { ...product, quantity }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += quantity;
      setCart(updatedCart);
    }
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.name !== product.name);
    setCart(updatedCart);
  };

  const handleQuantityChange = (product, quantity) => {
    const itemIndex = cart.findIndex((item) => item.name === product.name);
    const updatedCart = [...cart];
    updatedCart[itemIndex].quantity = quantity;
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    setCart([]);
    alert('Thanks for your purchase!');
  };

  return (
    <div className="App">
      <nav>
        <div className="logo">
          <h1>BuckART</h1>
        </div>
        <div className="nav-links">
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="cart">
          <button onClick={() => setCart([])}>
            <i className="fas fa-shopping-cart"></i>
            Cart ({cart.length})
          </button>
        </div>
        <div className="login">
          <button>Login</button>
        </div>
      </nav>
      <header>
        <l2>This is an Internship Project for iNeuron Intelligence Private Limited</l2>
      </header>
      <main>
        <div className="products">
          {products.map((product) => (
            <div key={product.name} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <ul>
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="product-actions">
                
                <button onClick={() => handleAddToCart(product, 1)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.name} className="cart-item">
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price}</p>
                    <p>
                      Quantity:{' '}
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                      />
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <p>Total: ${getTotalPrice()}</p>
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
