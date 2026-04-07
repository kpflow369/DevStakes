import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Trash2, ShoppingBag, CheckCircle } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, placeOrder, user } = useContext(AppContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);

  const handlePlaceOrder = () => {
    placeOrder();
    setOrderPlaced(true);
  };

  if (!user) {
    return (
      <div className="container text-center mt-4 fade-in">
        <h2>Please login to view your cart.</h2>
        <Link to="/auth" className="btn mt-2">Login Here</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container text-center mt-4 fade-in">
        <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '16px' }} />
        <h1>Order Confirmed!</h1>
        <p className="text-muted mt-2">Your order has been placed successfully. The farmers will be notified.</p>
        <Link to="/marketplace" className="btn mt-3">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <h2 className="mb-3" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center mt-4">
          <ShoppingBag size={64} color="rgba(255,255,255,0.2)" style={{ marginBottom: '16px' }} />
          <h3 className="text-muted">Your cart is empty.</h3>
          <Link to="/marketplace" className="btn mt-3">Browse Marketplace</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: 2, minWidth: '300px' }}>
            {cart.map(item => (
              <div key={item.id} className="glass-panel mb-2" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>By {item.farmerName}</p>
                  <p style={{ marginTop: '8px', color: 'var(--success)', fontWeight: 'bold' }}>₹{item.price}/kg x {item.cartQuantity}</p>
                </div>
                <button className="btn btn-danger" style={{ padding: '8px' }} onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ flex: 1, minWidth: '300px', position: 'sticky', top: '90px' }}>
            <h3 className="mb-3">Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="text-muted">Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="text-muted">Delivery Fee</span>
              <span>₹50</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--success)' }}>₹{total + 50}</span>
            </div>

            <button className="btn" style={{ width: '100%', justifyContent: 'center' }} onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
