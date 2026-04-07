import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Store, UserCircle, ShoppingCart, LogOut, Home, Presentation } from 'lucide-react';

export default function Navbar() {
  const { user, logout, cart } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Farm2City
      </Link>
      <div className="navbar-links">
        <Link to="/" className={`navbar-link ${isActive('/')}`}>
          <Home size={18} style={{marginRight: '4px', verticalAlign: 'text-bottom'}}/> 
          Home
        </Link>
        <Link to="/marketplace" className={`navbar-link ${isActive('/marketplace')}`}>
          <Store size={18} style={{marginRight: '4px', verticalAlign: 'text-bottom'}}/>
          Marketplace
        </Link>
        
        {user?.role === 'farmer' && (
          <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard')}`}>
            <Presentation size={18} style={{marginRight: '4px', verticalAlign: 'text-bottom'}}/>
            Dashboard
          </Link>
        )}

        {user ? (
          <>
            <Link to="/cart" className={`navbar-link ${isActive('/cart')}`} style={{display: 'flex', alignItems: 'center'}}>
              <ShoppingCart size={18} style={{marginRight: '4px'}}/>
              Cart {cart.length > 0 && <span className="badge" style={{marginLeft: '4px'}}>{cart.length}</span>}
            </Link>
            <Link to="/profile" className={`navbar-link ${isActive('/profile')}`} style={{display: 'flex', alignItems: 'center'}}>
              <UserCircle size={18} style={{marginRight: '4px'}}/>
              {user.name} ({user.role})
            </Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{padding: '6px 12px', fontSize: '0.9rem'}}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
