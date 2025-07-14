import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Button, Toast, Modal } from '../components/common';

const Cart = () => {
  const { cart, removeFromCart, clearCart, setCart } = useCart();
  const { orders, setOrders } = useData();
  const { user } = useAuth();
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [showConfirm, setShowConfirm] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setToast({ message: 'Item removed from cart!', type: 'success' });
  };

  const handleClear = () => {
    clearCart();
    setToast({ message: 'Cart cleared!', type: 'success' });
  };

  const handleCheckout = () => {
    setShowConfirm(true);
  };

  const confirmCheckout = () => {
    const newOrder = {
      id: Date.now(),
      userId: user.id,
      items: cart,
      total,
      status: 'Placed',
      createdAt: Date.now(),
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    window.localStorage.setItem('orders', JSON.stringify(updatedOrders));
    clearCart();
    setShowConfirm(false);
    setToast({ message: 'Order placed successfully!', type: 'success' });
  };

  return (
    <div className="cart-page card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 600 }}>
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
                    <td>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity || 1}
                        onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                        style={{ width: 50, textAlign: 'center', borderRadius: 4, border: '1px solid var(--color-border)' }}
                      />
                    </td>
                    <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                    <td><Button onClick={() => handleRemove(item.id)}>Remove</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Total: ${total.toFixed(2)}</div>
          <Button onClick={handleCheckout}>Checkout</Button>
          <Button onClick={handleClear} style={{ marginLeft: 16, background: 'var(--color-secondary)' }}>Clear Cart</Button>
        </>
      )}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <h3>Confirm Checkout</h3>
        <p>Are you sure you want to place this order?</p>
        <Button onClick={confirmCheckout}>Place Order</Button>
        <Button onClick={() => setShowConfirm(false)} style={{ marginLeft: 12 }}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default Cart; 