import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import { Shield, History, LogOut, Settings, Sun, Moon, Info, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="enterprise-nav" style={{ 
      margin: '0', 
      padding: '0.75rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: 1000,
      background: 'var(--nav-bg)',
      borderBottom: '1px solid var(--border)',
      width: '100%',
    }}>
      <Link to="/" onClick={() => setIsOpen(false)} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        textDecoration: 'none', 
        color: 'var(--text-main)', 
        transition: 'all 0.3s'
      }}
      className="logo-hover"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.75rem', color: 'white', boxShadow: '0 4px 15px var(--primary-glow)' }}>
            <Shield size={24} strokeWidth={2.5} />
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', letterSpacing: '-0.5px', fontSize: '1.25rem' }}>
            Guard<span style={{ color: 'var(--primary)' }}>Link</span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {[
          { name: 'Detection', path: '/detect', icon: Shield },
          { name: 'History', path: '/history', icon: History },
          { name: 'About', path: '/about', icon: Info },
        ].map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div key={item.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} style={{ position: 'relative' }}>
              <Link 
                to={item.path} 
                className="nav-link-premium"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  color: isActive ? 'var(--primary)' : 'var(--text-dim)',
                  background: isActive ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? '700' : '600',
                  transition: 'all 0.3s'
                }}
              >
                <item.icon size={18} /> {item.name}
              </Link>
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  style={{ 
                    position: 'absolute', 
                    bottom: '-4px', 
                    left: '20%', 
                    right: '20%', 
                    height: '3px', 
                    background: 'var(--primary)', 
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px var(--primary-glow)' 
                  }} 
                />
              )}
            </motion.div>
          );
        })}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginLeft: '0.5rem', paddingLeft: '1.25rem', borderLeft: '1px solid var(--glass-border)' }}>
          <motion.button 
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '2rem', border: '1px solid var(--glass-border)', cursor: 'pointer' }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.name}</span>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(244, 63, 94, 0.25)' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout} 
                className="logout-btn"
                style={{ 
                  padding: '0.6rem', 
                  background: 'rgba(244, 63, 94, 0.15)', 
                  color: '#fb7185', 
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <LogOut size={18} />
              </motion.button>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '0.75rem', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)' }}>Login</Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Toggle */}
      <motion.button 
        whileTap={{ scale: 0.8 }}
        className="mobile-toggle" 
        onClick={toggleMenu} 
        style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'absolute', 
              top: '110%', 
              left: '0.5rem', 
              right: '0.5rem', 
              background: 'var(--nav-bg)', 
              borderRadius: '1.25rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 1001
            }}
          >
            {[
              { name: 'Detection', path: '/detect', icon: Shield },
              { name: 'History', path: '/history', icon: History },
              { name: 'About', path: '/about', icon: Info },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name}
                  to={item.path} 
                  onClick={toggleMenu} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: isActive ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255,255,255,0.03)',
                    textDecoration: 'none',
                    color: isActive ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: '700',
                    border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <item.icon size={20} color={isActive ? "var(--primary)" : "var(--text-dim)"} /> {item.name}
                </Link>
              );
            })}
            
            <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={toggleTheme} 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-dim)',
                  padding: '1rem',
                  width: '100%',
                  textAlign: 'left',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              
              {user ? (
                <button 
                  onClick={handleLogout} 
                  className="btn-primary" 
                  style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)', width: '100%' }}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={toggleMenu} className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-premium:hover {
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary) !important;
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
