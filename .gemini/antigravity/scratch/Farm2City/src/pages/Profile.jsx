import { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { UserCircle, Package, Calendar } from 'lucide-react';

export default function Profile() {
  const { user, orders } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const myOrders = orders.filter(o => o.userId === user.id).sort((a, b) => b.id - a.id);

  return (
    <div className="container fade-in">
      <h2 className="mb-3" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        Profile Dashboard
      </h2>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Profile Card */}
        <div className="glass-panel" style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <UserCircle size={80} color="var(--primary)" style={{ marginBottom: '16px' }} />
            <h3>{user.name}</h3>
            <div className="badge mt-1" style={{ textTransform: 'capitalize' }}>{user.role}</div>
            
            <p className="text-muted mt-3" style={{ fontSize: '0.9rem' }}>
              User ID: {user.id}
            </p>
          </div>
        </div>

        {/* Order History */}
        <div style={{ flex: 2, minWidth: '400px' }}>
          <h3 className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={20} /> Order History
          </h3>

          {myOrders.length === 0 ? (
            <div className="glass-panel text-center">
              <p className="text-muted">You haven't placed any orders yet.</p>
              <Link to="/marketplace" className="btn btn-outline mt-3">Start Shopping</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {myOrders.map(order => {
                const orderTotal = order.items.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
                
                return (
                  <div key={order.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold' }}>Order #{order.id}</span>
                      <span className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                        <Calendar size={14} /> {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                          <span>{item.cartQuantity}x {item.name}</span>
                          <span>₹{item.price * item.cartQuantity}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--glass-border)' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>Total (incl. ₹50 fee)</span>
                      <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>₹{orderTotal + 50}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
