import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('buyer');
  const [name, setName] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(role, name);
      navigate(role === 'farmer' ? '/dashboard' : '/marketplace');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '400px', maxWidth: '100%' }}>
        <h2 className="text-center mb-3">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh or John"
              required 
            />
          </div>

          <div className="form-group">
            <label>I am a...</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                className={`btn ${role === 'buyer' ? '' : 'btn-outline'}`}
                style={{ flex: 1 }}
                onClick={() => setRole('buyer')}
              >
                Buyer
              </button>
              <button 
                type="button" 
                className={`btn ${role === 'farmer' ? '' : 'btn-outline'}`}
                style={{ flex: 1 }}
                onClick={() => setRole('farmer')}
              >
                Farmer
              </button>
            </div>
          </div>

          <button type="submit" className="btn mt-2" style={{ width: '100%' }}>
            {isLogin ? 'Login to Farm2City' : 'Sign Up for Farm2City'}
          </button>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
