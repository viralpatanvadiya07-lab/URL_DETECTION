import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Globe, Zap, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 1.5rem 4rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '5rem' }}
      >
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>
            Mission: <span style={{ color: 'var(--primary)' }}>Safe Browsing</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
            GuardLink was built to protect users from the ever-evolving threats of the digital world. Our platform uses cutting-edge AI to scan and analyze URLs in milliseconds.
        </p>
      </motion.div>

      <div className="responsive-grid" style={{ marginBottom: '6rem' }}>
        {[
          { title: 'Why it matters', desc: '90% of cyber attacks start with a malicious URL. Protecting your clicks is the first line of defense.', icon: <Zap color="var(--primary)" /> },
          { title: 'How it works', desc: 'We analyze domain reputation, SSL certificates, and page content to determine if a site is trustworthy.', icon: <Globe color="var(--secondary)" /> },
          { title: 'Our Promise', desc: 'Your data is never sold. We provide free, fast, and transparent security reports for everyone.', icon: <Heart color="var(--accent)" /> }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '2.5rem' }}
          >
            <div style={{ marginBottom: '1.25rem' }}>{item.icon}</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Info Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        <motion.div 
          className="glass-card about-section"
          style={{ display: 'flex', alignItems: 'center', gap: '3rem', padding: '3rem', flexWrap: 'wrap' }}
        >
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Prevent Phishing</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Phishing sites are designed to steal your passwords. GuardLink identifies these deceptive pages by comparing them against thousands of known malicious patterns.
            </p>
          </div>
          <div style={{ padding: '2rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '2rem' }}>
            <ShieldAlert size={80} color="var(--accent)" />
          </div>
        </motion.div>

        <motion.div 
          className="glass-card about-section"
          style={{ display: 'flex', alignItems: 'center', gap: '3rem', padding: '3rem', flexWrap: 'wrap', flexDirection: 'row-reverse' }}
        >
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Malware Protection</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Some URLs lead to automatic file downloads. Our scanner checks for hidden malware payloads to ensure your device stays clean and fast.
            </p>
          </div>
          <div style={{ padding: '2rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '2rem' }}>
            <ShieldCheck size={80} color="var(--success)" />
          </div>
        </motion.div>
      </div>

      <div style={{ marginTop: '8rem', textAlign: 'center', padding: '4rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '3rem', border: '1px solid var(--glass-border)' }}>
          <Shield size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to stay safe?</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Join thousands of users who trust GuardLink for their daily security.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary" 
            style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
          >
            Get Started Now
          </motion.button>
      </div>
    </div>
  );
};

export default About;
