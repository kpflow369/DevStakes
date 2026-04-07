import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Edit2, Info } from 'lucide-react';

export default function ProductCard({ product, isOwner, onEdit }) {
  const { addToCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="glass-card">
      <img 
        src={product.image || 'https://images.unsplash.com/photo-1595855768565-df63c4eb89a5?auto=format&fit=crop&w=500&q=60'} 
        alt={product.name} 
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ marginBottom: '4px' }}>{product.name}</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>By {product.farmerName}</p>
        </div>
        <div className="badge">{product.category}</div>
      </div>
      
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'var(--success)' }}>₹{product.price}/kg</h2>
        <span className="text-muted" style={{ fontSize: '0.85rem' }}>Qty: {product.quantity}</span>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
        <Link to={`/product/${product.id}`} className="btn btn-outline" style={{ flex: 1, padding: '8px', justifyContent: 'center' }}>
          <Info size={16} /> Details
        </Link>
        {isOwner ? (
          <button className="btn" style={{ flex: 1, padding: '8px' }} onClick={() => onEdit(product)}>
            <Edit2 size={16} /> Edit
          </button>
        ) : (
          <button className="btn" style={{ flex: 1, padding: '8px' }} onClick={handleAddToCart}>
            <ShoppingCart size={16} /> Add
          </button>
        )}
      </div>
    </div>
  );
}
