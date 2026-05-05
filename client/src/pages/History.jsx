import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Shield, ShieldCheck, ShieldAlert, ShieldQuestion, Trash2, Calendar, Link as LinkIcon, Loader2, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
          setLoading(false);
          return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('/api/url/history', config);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const deleteHistory = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`/api/url/history/${id}`, config);
      setHistory(history.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting history:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe': return <ShieldCheck size={24} color="var(--success)" />;
      case 'malicious': return <ShieldAlert size={24} color="var(--accent)" />;
      default: return <ShieldQuestion size={24} color="var(--text-dim)" />;
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem' }}>Scan History</h1>
            <p style={{ color: 'var(--text-dim)' }}>Manage and review your recent URL security checks.</p>
        </div>
        {user && history.length > 0 && (
            <div className="glass-card" style={{ padding: '0.75rem 1.5rem', width: 'fit-content', borderRadius: '3rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <span style={{ color: 'var(--primary)' }}>{history.length}</span> Total Scans
            </div>
        )}
      </div>

      {!user ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <Shield size={60} color="var(--primary)" style={{ marginBottom: '2rem', opacity: 0.3 }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Secure Access</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>You need to be logged in to view and manage your private scan history.</p>
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 3rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
            Login Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      ) : history.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <Search size={60} color="var(--text-dim)" style={{ marginBottom: '2rem', opacity: 0.3 }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-dim)' }}>No Scans Yet</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Protect your first URL to see it appear in your history.</p>
          <Link to="/detect" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 3rem' }}>Start First Scan</Link>
        </motion.div>
      ) : (
        <div className="responsive-grid">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card"
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                    {getStatusIcon(item.status)}
                  </div>
                  <button 
                    onClick={() => deleteHistory(item._id)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: '0.5rem', opacity: 0.6 }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                    {item.status} URL
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', wordBreak: 'break-all', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.url}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.85rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                  <Calendar size={14} />
                  {new Date(item.scanDate).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default History;
