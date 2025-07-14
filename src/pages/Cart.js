import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-page card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <table style={{ width: '100%', marginBottom: 24 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Book</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price?.toFixed(2)}</td>
                  <td>{item.quantity || 1}</td>
                  <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  <td><Button onClick={() => removeFromCart(item.id)}>Remove</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Total: ${total.toFixed(2)}</div>
          <Button onClick={() => alert('Checkout coming soon!')}>Checkout</Button>
          <Button onClick={clearCart} style={{ marginLeft: 16, background: 'var(--color-secondary)' }}>Clear Cart</Button>
        </>
      )}
    </div>
  );
};

export default Cart; 