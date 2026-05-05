import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Search, Link as LinkIcon, ArrowRight, CheckCircle, Lock, 
  Users, AlertTriangle, Globe, Zap, Eye, Cpu, Mail, Send, 
  ExternalLink, MousePointer2, Fingerprint, Activity
} from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalScans: 0,
    totalUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/url/stats');
        setStats({
            totalScans: data.totalScans || 12,
            totalUsers: data.totalUsers || 1
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ totalScans: 12, totalUsers: 1 });
      }
    };
    fetchStats();
  }, []);

  const handleExplore = () => {
    navigate('/detect');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        width: '100%', 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--hero-gradient), var(--hero-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        marginTop: '0', 
        paddingTop: '160px', 
        paddingBottom: '140px',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.9)',
        filter: 'brightness(1.1) contrast(1.1)'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ 
            textAlign: 'center', 
            zIndex: 2,
            background: 'radial-gradient(circle, rgba(2, 6, 23, 0.6) 0%, transparent 80%)',
            padding: '4rem 2rem',
            borderRadius: '2rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.5rem 1.2rem', 
                background: 'rgba(14, 165, 233, 0.1)', 
                borderRadius: '2rem', 
                border: '1px solid var(--primary)',
                marginBottom: '2rem',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--primary)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}
          >
            <Activity size={14} /> Enterprise URL Protection System
          </motion.div>

          <h1 
            className="hero-title text-gradient"
            style={{ 
              fontSize: 'min(7vw, 96px)', 
              fontWeight: '800', 
              letterSpacing: '-0.04em', 
              margin: '0 0 1.5rem 0', 
              lineHeight: '1.05'
            }}
          >
            Intelligent URL<br/>Protection
          </h1>
          
          <div 
            className="hero-subtitle"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.5rem', 
              marginBottom: '4rem',
              color: 'var(--text-dim)',
              fontWeight: '500',
              fontSize: 'min(1.4vw, 18px)',
              maxWidth: '600px',
              margin: '0 auto 5rem'
            }}
          >
            Enterprise-grade malicious URL detection powered by advanced neural threat analysis.
          </div>

          <div 
            className="responsive-flex"
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '3rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            <motion.button
              whileHover={{ backgroundColor: 'var(--primary-hover)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExplore}
              style={{ 
                padding: '1rem 2.5rem', 
                borderRadius: '6px', 
                background: 'var(--primary)', 
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <span>Scan URL Now</span> <Zap size={18} fill="white" />
            </motion.button>

            {/* Stats and Info Row */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="glass-card"
                  style={{ 
                    padding: '1.2rem 2rem', 
                    background: 'rgba(15, 23, 42, 0.5)',
                    borderLeft: '4px solid var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <Shield size={32} color="var(--primary)" />
                  <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Engine Version 4.0</div>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>Neural Threat Analysis</div>
                  </div>
                </motion.div>

                <div className="glass-card" style={{ padding: '1.2rem 2rem', display: 'flex', gap: '3rem', background: 'rgba(15, 23, 42, 0.5)' }}>
                  <div>
                    <div className="stat-number" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1' }}>{stats.totalUsers}+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.2rem' }}>Users</div>
                  </div>
                  <div>
                    <div className="stat-number" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1' }}>{stats.totalScans}+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.2rem' }}>Scans</div>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
        >
            <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }}></div>
        </motion.div>
      </section>

      {/* Trust Section / Partner Bar */}
      <div style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', alignItems: 'center', opacity: 0.6, grayscale: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: '800', fontSize: '1.2rem' }}><Shield size={24} /> SECURE GATE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: '800', fontSize: '1.2rem' }}><Lock size={24} /> TRUST NET</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: '800', fontSize: '1.2rem' }}><Globe size={24} /> GLOBAL DEFENSE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: '800', fontSize: '1.2rem' }}><Zap size={24} /> CYBER SPEED</div>
        </div>
      </div>

      {/* Features Grid */}
      <section style={{ padding: '10rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
            <motion.span variants={itemVariants} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Comprehensive Intelligence</motion.span>
            <motion.h2 className="text-gradient" variants={itemVariants} style={{ fontSize: 'min(6vw, 3.5rem)', fontWeight: '800', marginTop: '1rem', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Multi-Layered Protection</motion.h2>
            <motion.p variants={itemVariants} style={{ color: 'var(--text-dim)', maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.7' }}>
                Leveraging the latest in Neural Networks and Sandbox environments to provide a defense system that evolves with emerging threats.
            </motion.p>
        </motion.div>

        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {[
            { 
              title: 'Visual AI Recognition', 
              desc: 'Identifies fraudulent sites by pixel-perfect visual analysis, detecting even the most sophisticated brand spoofs.', 
              icon: <Eye size={32} color="var(--primary)" />,
              color: 'var(--primary)'
            },
            { 
              title: 'Behavioral Sandbox', 
              desc: 'Isolated execution protocol that monitors script behavior in real-time, catching malicious payloads before they hit your device.', 
              icon: <Cpu size={32} color="var(--secondary)" />,
              color: 'var(--secondary)'
            },
            { 
              title: 'Threat Intelligence', 
              desc: 'Continuous synchronization with global threat databases ensures you are protected against the latest known bad actors.', 
              icon: <Globe size={32} color="var(--success)" />,
              color: 'var(--success)'
            },
            { 
              title: 'Heuristic Engine', 
              desc: 'Analyzes URL structure and metadata to identify suspicious patterns using advanced heuristic algorithms.', 
              icon: <Fingerprint size={32} color="var(--warning)" />,
              color: 'var(--warning)'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
              style={{ padding: '4rem 3rem', borderTop: `4px solid ${item.color}` }}
            >
              <div style={{ marginBottom: '2rem', display: 'inline-flex', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1.2rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem', fontWeight: '800' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '1.05rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)' }}>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 3rem', textAlign: 'center' }}
          >
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', width: '64px', height: '64px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <Shield size={32} color="var(--primary)" />
              </div>
              <h2 className="text-gradient" style={{ fontSize: 'min(5vw, 2.5rem)', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.04em' }}>Secure Your Digital Journey</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                  Don't leave your security to chance. Use the world's most advanced AI-driven URL protection system today.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.button
                      whileHover={{ backgroundColor: 'var(--primary-hover)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExplore}
                      style={{
                          padding: '1rem 2rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          background: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                      }}
                  >
                      Get Started Now <ArrowRight size={18} />
                  </motion.button>
                  <motion.button
                      whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
                      onClick={() => navigate('/about')}
                      style={{
                          padding: '1rem 2rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          background: 'transparent',
                          color: 'var(--text-main)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          cursor: 'pointer'
                      }}
                  >
                      Learn More
                  </motion.button>
              </div>
          </motion.div>
      </section>

      {/* Community Section */}
      <section style={{ padding: '10rem 2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card" 
          style={{ 
            padding: '6rem 2rem', 
            textAlign: 'center', 
            maxWidth: '1200px',
            margin: '0 auto',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem' }}>
            <Users size={30} color="var(--secondary)" />
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>Global Security Community</h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Connect with experts, share threat intelligence, and stay ahead of cyber criminals.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'X / Twitter', icon: <Globe size={24} />, count: '50K+' },
              { name: 'Discord', icon: <Zap size={24} />, count: '25K+' },
              { name: 'LinkedIn', icon: <Users size={24} />, count: '100K+' },
              { name: 'Telegram', icon: <Send size={24} />, count: '15K+' }
            ].map((social, i) => (
              <motion.a
                key={social.name}
                href="#"
                whileHover={{ y: -8 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  textDecoration: 'none', 
                  width: '140px',
                  padding: '1.5rem',
                  borderRadius: '1.5rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ color: 'var(--primary)' }}>{social.icon}</div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '900', color: 'var(--text-main)', fontSize: '1.1rem' }}>{social.count}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.2rem' }}>{social.name}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
