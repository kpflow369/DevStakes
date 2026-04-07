import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Marketplace() {
  const { products } = useContext(AppContext);
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];

  const filtered = products.filter(p => {
    const matchCategory = category === 'All' || p.category === category;
    const matchPrice = p.price <= maxPrice;
    return matchCategory && matchPrice;
  });

  return (
    <div className="container fade-in">
      <h2 className="mb-3" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        Fresh Marketplace
      </h2>

      <div className="glass-panel mb-4" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label className="text-muted">Category:</label>
          <select 
            className="form-control" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '150px', padding: '8px' }}
          >
            {categories.map(c => <option key={c} value={c} style={{ color: 'black' }}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '200px' }}>
          <label className="text-muted" style={{ whiteSpace: 'nowrap' }}>Max Price: ₹{maxPrice}</label>
          <input 
            type="range" 
            min="10" 
            max="1000" 
            step="10" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center mt-4">
          <img src="https://api.iconify.design/mdi:basket-remove-outline.svg?color=rgba(255,255,255,0.2)" width="100" alt="empty" />
          <h3 className="mt-2 text-muted">No products found matching your criteria.</h3>
        </div>
      ) : (
        <div className="grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} isOwner={false} />
          ))}
        </div>
      )}
    </div>
  );
}
