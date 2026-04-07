import { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { PlusCircle, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user, products, addProduct, updateProduct, deleteProduct } = useContext(AppContext);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', price: '', quantity: '', category: 'Vegetables', image: '' });
  const [suggestedPrice, setSuggestedPrice] = useState(null);

  useEffect(() => {
    // Mock ML Logic: Price Suggestion System
    if (formData.name && formData.category) {
      const base = formData.category === 'Vegetables' ? 20 : formData.category === 'Fruits' ? 50 : 80;
      const seed = formData.name.length; // dummy determinism
      const min = base + seed;
      const max = base + seed + 30;
      setSuggestedPrice(`₹${min} - ₹${max}`);
    } else {
      setSuggestedPrice(null);
    }
  }, [formData.name, formData.category]);

  if (!user || user.role !== 'farmer') {
    return <Navigate to="/auth" />;
  }

  const myProducts = products.filter(p => p.farmerId === user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateProduct(formData.id, { ...formData, price: Number(formData.price), quantity: Number(formData.quantity) });
    } else {
      addProduct({ ...formData, price: Number(formData.price), quantity: Number(formData.quantity) });
    }
    setShowForm(false);
    setFormData({ id: null, name: '', price: '', quantity: '', category: 'Vegetables', image: '' });
  };

  const handleEdit = (prod) => {
    setFormData(prod);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        <h2>Welcome to your Dashboard, {user.name}</h2>
        <button className="btn" onClick={() => { setShowForm(!showForm); setFormData({ id: null, name: '', price: '', quantity: '', category: 'Vegetables', image: '' }); }}>
          {showForm ? 'Cancel' : <><PlusCircle size={18}/> Add Product</>}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel mb-4 fade-in" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
          <h3 className="mb-3">{formData.id ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="e.g. Fresh Red Tomatoes" />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ color: formData.category ? 'white' : 'black' }}>
                <option value="Vegetables" style={{ color: 'black' }}>Vegetables</option>
                <option value="Fruits" style={{ color: 'black' }}>Fruits</option>
                <option value="Grains" style={{ color: 'black' }}>Grains</option>
                <option value="Dairy" style={{ color: 'black' }}>Dairy</option>
              </select>
            </div>

            {suggestedPrice && (
              <div className="mb-3" style={{ background: 'rgba(0, 210, 255, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--success)"/>
                <span><strong>AI Suggestion:</strong> Based on market trends, estimated price for {formData.name} is {suggestedPrice}/kg.</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Price (₹ per kg/litre)</label>
                <input type="number" className="form-control" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required min="1" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Quantity Available</label>
                <input type="number" className="form-control" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} required min="1" />
              </div>
            </div>

            <div className="form-group">
              <label>Image URL (Optional)</label>
              <input type="url" className="form-control" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn" style={{ flex: 2 }}>{formData.id ? 'Update Product' : 'List Product'}</button>
              {formData.id && (
                <button type="button" className="btn btn-danger" style={{ flex: 1 }} onClick={() => { deleteProduct(formData.id); setShowForm(false); }}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <h3>Your Active Listings</h3>
      {myProducts.length === 0 ? (
        <div className="text-center mt-4">
          <p className="text-muted">You have no active listings. Click "Add Product" to start selling.</p>
        </div>
      ) : (
        <div className="grid">
          {myProducts.map(product => (
            <ProductCard key={product.id} product={product} isOwner={true} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
