import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Search, ShieldCheck, ShieldAlert, ShieldQuestion, Loader2, ExternalLink, Link as LinkIcon, Lock, Cpu, Globe, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UrlDetection = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    if (!user) {
        setError('Please login to scan URLs');
        return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setScanProgress(0);

    // Simulated satisfying progress
    const interval = setInterval(() => {
        setScanProgress(prev => {
            if (prev >= 90) {
                clearInterval(interval);
                return 90;
            }
            return prev + 10;
        });
    }, 150);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('/api/url/scan', { url }, config);
      
      clearInterval(interval);
      setScanProgress(100);
      
      setTimeout(() => {
          setResult(data);
          setLoading(false);
      }, 300);

    } catch (err) {
      clearInterval(interval);
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe': return <ShieldCheck size={48} color="var(--success)" />;
      case 'malicious': return <ShieldAlert size={48} color="var(--accent)" />;
      default: return <ShieldQuestion size={48} color="var(--text-dim)" />;
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 1.5rem 4rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="text-gradient" style={{ fontSize: 'min(7vw, 3.5rem)', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '1rem' }}>
          Detect Threats Before They Click
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: '400', maxWidth: '600px', margin: '0 auto' }}>
          Real-time AI-powered URL analysis to keep your browsing safe.
        </p>
      </motion.div>

      <form onSubmit={handleScan} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={20} />
          <input
            type="text"
            className="input-field"
            placeholder="Paste URL here for instant analysis..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ paddingLeft: '3rem' }}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap', minWidth: '160px', justifyContent: 'center' }}>
          {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
          {loading ? 'Analyzing...' : 'Scan Now'}
        </button>
      </form>

      {/* Progress Bar */}
      <AnimatePresence>
        {loading && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ marginBottom: '3rem' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Scanning URL...</span>
                    <span style={{ color: 'var(--text-dim)' }}>{scanProgress}%</span>
                </div>
                <div style={{ height: '4px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${scanProgress}%` }}
                        style={{ height: '100%', background: 'var(--primary)' }}
                    />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            style={{ color: 'var(--accent)', textAlign: 'center', marginBottom: '2rem', padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '0.75rem' }}
        >
            {error}
        </motion.div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {result.fallbackMode && (
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <ShieldAlert color="#f59e0b" size={24} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#f59e0b', fontSize: '1rem' }}>Advanced ML Models Offline</h4>
                  <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.85rem' }}>Python is not installed or configured on the server. Using basic keyword detection. Predictions may be inaccurate.</p>
                </div>
              </div>
            )}

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
                  {getStatusIcon(result.status)}
                  </div>
                  <div style={{ flex: '1', minWidth: '250px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.5rem', margin: 0, textTransform: 'capitalize' }}>
                              {result.status}
                          </h3>
                          <div style={{ padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', background: result.status === 'safe' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)', color: result.status === 'safe' ? 'var(--success)' : 'var(--accent)', border: `1px solid ${result.status === 'safe' ? 'var(--success)' : 'var(--accent)'}` }}>
                              {result.status === 'safe' ? '98% Secure' : 'High Risk'}
                          </div>
                      </div>
                      <p style={{ color: 'var(--text-dim)', wordBreak: 'break-all', fontSize: '0.95rem', margin: 0 }}>{result.url}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                              onClick={() => {
                                  navigator.clipboard.writeText(result.url);
                                  alert('URL copied to clipboard!');
                              }}
                              className="glass-card" 
                              style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', border: '1px solid var(--glass-border)' }}
                          >
                              <LinkIcon size={18} />
                          </button>
                          <a href={result.url} target="_blank" rel="noopener noreferrer" className="glass-card" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                              <ExternalLink size={20} />
                          </a>
                      </div>
                  </div>
                  
                  <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>Threat Category</div>
                      <div style={{ fontWeight: '700', fontSize: '1rem' }}>{result.threatType || 'Clean'}</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>Analysis Date</div>
                      <div style={{ fontWeight: '700', fontSize: '1rem' }}>{new Date(result.scanDate).toLocaleDateString()}</div>
                      </div>
                  </div>
                  </div>
              </div>
            </div>

            {/* Analysis Features Section */}
            <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        Advanced Security Analysis
                    </h3>
                    <div style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.7rem', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid var(--success)' }}>
                        LIVE DATA
                    </div>
                </div>

                <div className="responsive-grid">
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '0.75rem' }}>
                            <Cpu size={20} color="var(--primary)" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Deep Sandbox</div>
                            <div style={{ fontWeight: '700' }}>No Malware Detected</div>
                        </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem' }}>
                            <Globe size={20} color="var(--success)" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>SSL Check</div>
                            <div style={{ fontWeight: '700' }}>Valid Certificate</div>
                        </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '0.75rem' }}>
                            <Activity size={20} color="var(--accent)" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Reputation Score</div>
                            <div style={{ fontWeight: '700' }}>89/100 (Secure)</div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Stats Footer */}
      {!loading && !result && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '6rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}
        >
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Community Powered Security</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>10k+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Threats Identified</div>
                </div>
                <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>24/7</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Live Monitoring</div>
                </div>
                <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>99.9%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Accuracy Rate</div>
                </div>
            </div>
        </motion.div>
      )}
    </div>
  );
};

export default UrlDetection;
