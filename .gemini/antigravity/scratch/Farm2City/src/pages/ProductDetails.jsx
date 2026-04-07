import { useContext, useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, ArrowLeft, Send, MessageCircle } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart, user } = useContext(AppContext);
  const navigate = useNavigate();
  
  const product = products.find(p => p.id.toString() === id);

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([{ text: `Hi! I'm ${product?.farmerName}. Interested in my ${product?.name}?`, sender: 'farmer' }]);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatOpen, messages, product]);

  if (!product) {
    return <div className="container text-center mt-4"><h2>Product Not Found</h2><Link to="/marketplace" className="btn mt-2">Back to Market</Link></div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(product);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, sender: 'me' }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thanks for reaching out! We can negotiate or I can arrange quick delivery. Let me know what you need.", sender: 'farmer' }]);
    }, 1000);
  };

  return (
    <div className="container fade-in">
      <Link to="/marketplace" className="btn btn-outline mb-3" style={{ padding: '8px 16px' }}>
        <ArrowLeft size={16} /> Back
      </Link>

      <div className="glass-panel" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1595855768565-df63c4eb89a5?auto=format&fit=crop&w=800&q=60'} 
          alt={product.name}
          style={{ flex: 1, minWidth: '300px', borderRadius: '12px', objectFit: 'cover', maxHeight: '400px', width: '100%' }}
        />
        
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
          <div className="badge" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>{product.category}</div>
          <h1 style={{ marginBottom: '8px' }}>{product.name}</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Farm: {product.farmerName}</p>
          
          <h2 style={{ color: 'var(--success)', marginBottom: '24px', fontSize: '2rem' }}>₹{product.price} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ kg</span></h2>
          
          <p style={{ marginBottom: '8px' }}><strong>Available Quantity:</strong> {product.quantity} kg</p>
          <p className="text-muted" style={{ lineHeight: '1.6', marginBottom: '32px' }}>
            Freshly harvested from {product.farmerName}. We guarantee 100% organic and pesticide-free produce delivered directly from the farm to your doorstep.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
            <button className="btn" style={{ flex: 1, padding: '16px', fontSize: '1.1rem' }} onClick={handleAddToCart}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="btn btn-outline" style={{ padding: '16px' }} onClick={() => setChatOpen(!chatOpen)}>
              <MessageCircle size={20} /> Chat with Farmer
            </button>
          </div>
        </div>
      </div>

      {/* Mock Live Negotiation Chat section */}
      {chatOpen && (
        <div className="glass-panel fade-in mt-4" style={{ maxWidth: '600px', margin: '32px auto 0' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <MessageCircle size={20} /> Live Chat with {product.farmerName}
          </h3>
          
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', height: '300px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'me' ? 'var(--primary)' : 'var(--glass-bg)',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  borderBottomRightRadius: msg.sender === 'me' ? '2px' : '12px',
                  borderBottomLeftRadius: msg.sender === 'farmer' ? '2px' : '12px',
                  maxWidth: '80%'
                }}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendChat} style={{ display: 'flex', marginTop: '16px', gap: '8px' }}>
              <input 
                type="text" 
                className="form-control" 
                style={{ flex: 1 }} 
                placeholder="Type a message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn"><Send size={18} /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
