import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Shield, Users, AlertTriangle, CheckCircle, Search, Trash2, ExternalLink, Filter, TrendingUp, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
  const [scans, setScans] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalScans: 0, threatsDetected: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        
        // Fetch All Scans
        const { data: allScans } = await axios.get('/api/url/history/all', config);
        setScans(allScans);

        // Fetch Stats
        const { data: globalStats } = await axios.get('/api/url/stats');
        setStats({
            totalUsers: globalStats.totalUsers,
            totalScans: globalStats.totalScans,
            threatsDetected: globalStats.maliciousScans
        });

      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) fetchAdminData();
  }, [user]);

  if (!user?.isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <Shield size={80} color="var(--accent)" style={{ opacity: 0.3, marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: '900' }}>Access Denied</h1>
        <p style={{ color: 'var(--text-dim)' }}>You do not have administrative privileges to view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                  <Activity size={16} /> Live Intelligence
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '900' }}>Admin <span style={{ color: 'var(--primary)' }}>Control Center</span></h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Server Status: Operational</span>
              </div>
          </div>
      </div>

      {/* Stats Overview */}
      <div className="responsive-grid" style={{ marginBottom: '5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {[
          { label: 'Total Scans', value: stats.totalScans, icon: <TrendingUp />, color: 'var(--primary)' },
          { label: 'Active Users', value: stats.totalUsers, icon: <Users />, color: 'var(--secondary)' },
          { label: 'Threats Blocked', value: stats.threatsDetected, icon: <AlertTriangle />, color: 'var(--accent)' }
        ].map((s, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: `${s.color}15`, padding: '1.25rem', borderRadius: '1rem', color: s.color }}>{s.icon}</div>
            <div>
                <h4 style={{ fontSize: '2rem', fontWeight: '900' }}>{s.value}</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Recent Threat Analysis</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                      <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                      <input type="text" placeholder="Search URLs..." className="input-field" style={{ paddingLeft: '3rem', fontSize: '0.9rem', width: '300px' }} />
                  </div>
                  <button className="glass-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold', border: '1px solid var(--glass-border)' }}>
                      <Filter size={18} /> Filter
                  </button>
              </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                  <thead>
                      <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-dim)', textAlign: 'left' }}>
                          <th style={{ padding: '1rem', fontSize: '0.85rem' }}>STATUS</th>
                          <th style={{ padding: '1rem', fontSize: '0.85rem' }}>URL / DOMAIN</th>
                          <th style={{ padding: '1rem', fontSize: '0.85rem' }}>THREAT TYPE</th>
                          <th style={{ padding: '1rem', fontSize: '0.85rem' }}>SCAN DATE</th>
                          <th style={{ padding: '1rem', fontSize: '0.85rem' }}>ACTIONS</th>
                      </tr>
                  </thead>
                  <tbody>
                      {scans.length === 0 ? (
                          <tr>
                              <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-dim)' }}>No threat logs available.</td>
                          </tr>
                      ) : scans.map((scan) => (
                          <tr key={scan._id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s' }}>
                              <td style={{ padding: '1.5rem 1rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: scan.status === 'safe' ? 'var(--success)' : 'var(--accent)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                      {scan.status === 'safe' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                                      {scan.status.toUpperCase()}
                                  </div>
                              </td>
                              <td style={{ padding: '1.5rem 1rem' }}>
                                  <div style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '600' }}>{scan.url}</div>
                              </td>
                              <td style={{ padding: '1.5rem 1rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>{scan.threatType || 'Clean'}</td>
                              <td style={{ padding: '1.5rem 1rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>{new Date(scan.scanDate).toLocaleString()}</td>
                              <td style={{ padding: '1.5rem 1rem' }}>
                                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                                      <a href={scan.url} target="_blank" rel="noreferrer" className="glass-card" style={{ padding: '0.5rem', color: 'var(--primary)' }}><ExternalLink size={16} /></a>
                                      <button className="glass-card" style={{ padding: '0.5rem', color: 'var(--accent)' }}><Trash2 size={16} /></button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default Admin;
