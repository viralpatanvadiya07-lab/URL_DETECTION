import { Link } from 'react-router-dom';
import { Shield, Globe, Info, Mail, ArrowRight, Users, Zap, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px' }}>
                Malicious <span style={{ color: 'var(--primary)' }}>URL</span> Detection
            </h3>
          </div>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.7', maxWidth: '400px', marginBottom: '2rem' }}>
            The world's most advanced AI-powered URL security platform. Protecting millions of users from phishing, malware, and digital threats.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" className="footer-link"><Globe size={20} /></a>
            <a href="#" className="footer-link"><Info size={20} /></a>
            <a href="#" className="footer-link"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>
          <Link to="/detect" className="footer-link">URL Detection</Link>
          <Link to="/history" className="footer-link">Scan History</Link>
          <Link to="/about" className="footer-link">Our Technology</Link>
          <Link to="#" className="footer-link">API Reference</Link>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <Link to="#" className="footer-link">Privacy Policy</Link>
          <Link to="#" className="footer-link">Terms of Service</Link>
          <Link to="#" className="footer-link">Cookie Policy</Link>
          <Link to="#" className="footer-link">Security Whitepaper</Link>
        </div>

        <div className="footer-column" style={{ gridColumn: 'span 2' }}>
          <h4>Join the Community</h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Stay connected for real-time security alerts and updates.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                  { icon: <Globe size={18} />, label: 'Twitter' },
                  { icon: <Users size={18} />, label: 'LinkedIn' },
                  { icon: <Zap size={18} />, label: 'Discord' },
                  { icon: <Send size={18} />, label: 'Telegram' }
              ].map((s, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
                    style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '0.75rem', 
                        background: 'rgba(255,255,255,0.05)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'var(--text-dim)',
                        border: '1px solid var(--glass-border)',
                        transition: 'all 0.3s'
                    }}
                  >
                      {s.icon}
                  </motion.a>
              ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '4rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Malicious URL Detection Systems Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>System Status: <span style={{ color: 'var(--success)' }}>Online</span></span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Engine: v4.2.0</span>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
