import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Truck, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }} className="fade-in">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Empowering Farmers, Delivering Freshness
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
            Connect directly with local farmers. Buy fresh, organic produce with no middlemen, transparent pricing, and instant AI-assisted support.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/marketplace" className="btn" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Explore Marketplace
            </Link>
            <Link to="/auth" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Join as a Farmer
            </Link>
          </div>
        </div>
      </section>

      {/* Thought of the Day */}
      <section className="container mb-4 fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="glass-panel text-center" style={{ position: 'relative', overflow: 'hidden' }}>
          <Quote size={40} color="rgba(255,255,255,0.1)" style={{ position: 'absolute', top: '-10px', left: '-10px' }} />
          <h3 style={{ color: 'var(--success)', marginBottom: '12px' }}>Thought of the Day</h3>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', fontWeight: '300' }}>
            "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness." 
            <br/><br/>- Thomas Jefferson
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mb-4 fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-center mb-4">Why Choose Farm2City?</h2>
        <div className="grid">
          <div className="glass-card text-center text-center">
            <div style={{ color: 'var(--primary)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Leaf size={48} /></div>
            <h3 className="mb-1">100% Fresh & Organic</h3>
            <p className="text-muted">Directly sourced from farms immediately after harvest.</p>
          </div>
          <div className="glass-card text-center text-center">
            <div style={{ color: 'var(--success)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><ShieldCheck size={48} /></div>
            <h3 className="mb-1">Fair & Transparent</h3>
            <p className="text-muted">Zero middlemen. Farmers set their prices, you get the best deal.</p>
          </div>
          <div className="glass-card text-center text-center">
            <div style={{ color: 'var(--danger)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Truck size={48} /></div>
            <h3 className="mb-1">Direct Delivery</h3>
            <p className="text-muted">Seamless coordination and local delivery network options.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
