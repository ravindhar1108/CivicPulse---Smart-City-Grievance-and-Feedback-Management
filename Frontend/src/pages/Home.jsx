import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section className="hero">
        <h1>Transform Your City's Future</h1>
        <p>CivicPulse connects citizens directly with local government, allowing for transparent, fast, and accountable grievance resolution.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Get Started</Link>
          <Link to="/login" className="btn btn-secondary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Login to Account</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 mt-4">
        <div className="card animate-fade-in stagger-1">
          <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
            <ShieldAlert size={48} />
          </div>
          <h3 className="mb-2">Report Issues Fast</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Log grievances easily with our intuitive interface. Your voice matters, and we make sure it's heard by the right officials.</p>
        </div>
        
        <div className="card animate-fade-in stagger-2">
          <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>
            <Users size={48} />
          </div>
          <h3 className="mb-2">Transparent Resolution</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Track the real-time status of your complaints as they are assigned to relevant officers and resolved.</p>
        </div>

        <div className="card animate-fade-in stagger-3">
          <div style={{ color: 'var(--warning)', marginBottom: '1rem' }}>
            <TrendingUp size={48} />
          </div>
          <h3 className="mb-2">Data-Driven Governance</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Administrators get an eagle-eye view of all city issues to allocate resources effectively and improve living standards.</p>
        </div>
      </section>
    </div>
  );
}
