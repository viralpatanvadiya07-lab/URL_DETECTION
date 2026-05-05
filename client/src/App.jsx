import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UrlDetection from './pages/UrlDetection';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Admin from './pages/Admin';
import { Shield, Lock, Key, Globe, Zap, Fingerprint, Activity, Cpu } from 'lucide-react';

const BackgroundOrbs = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, overflow: 'hidden', pointerEvents: 'none' }}>
    <motion.div 
      animate={{ 
        x: [0, 100, 0], 
        y: [0, 50, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ 
        position: 'absolute', top: '10%', left: '15%', width: '40vw', height: '40vw', 
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)', 
        filter: 'blur(60px)', borderRadius: '50%' 
      }} 
    />
    <motion.div 
      animate={{ 
        x: [0, -120, 0], 
        y: [0, 80, 0],
        scale: [1, 1.3, 1]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      style={{ 
        position: 'absolute', bottom: '15%', right: '10%', width: '35vw', height: '35vw', 
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)', 
        filter: 'blur(80px)', borderRadius: '50%' 
      }} 
    />
  </div>
);

const FloatingShapes = () => {
  const icons = [Shield, Lock, Key, Globe, Zap, Fingerprint, Activity, Cpu];
  const shapes = Array.from({ length: 15 });
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none', 
      zIndex: -1, 
      overflow: 'hidden',
    }}>
      {/* 3D Perspective Digital Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        perspective: '1000px',
        opacity: 0.1
      }}>
        <motion.div 
          animate={{ rotateX: [20, 25, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: 'rotateX(60deg) translateY(-100px)',
            transformStyle: 'preserve-3d'
          }} 
        />
      </div>

      {/* 3D Scanning Beam */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          boxShadow: '0 0 20px var(--primary)',
          opacity: 0.2,
          zIndex: 0
        }}
      />

      {shapes.map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = 20 + Math.random() * 30;
        return (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              z: Math.random() * -500,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{ 
              z: [Math.random() * -500, 200],
              y: ['-10%', '110%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 20 + Math.random() * 30, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 20
            }}
            style={{
              position: 'absolute',
              color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
              filter: `blur(${Math.random() * 3}px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <Icon size={size} strokeWidth={0.5} />
          </motion.div>
        );
      })}
    </div>
  );
};

function App() {
  return (
    <Router>
      <BackgroundOrbs />
      <FloatingShapes />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<UrlDetection />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
