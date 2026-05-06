import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, LayoutDashboard, Clock, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Meetings', path: '/meetings', icon: <Users size={20} /> },
    { name: 'Availability', path: '/availability', icon: <Clock size={20} /> },
    { name: 'Schedule', path: '/book/me', icon: <Calendar size={20} /> },
  ];

  return (
    <nav className="navbar glass-card">
      <Link to="/" className="logo">
        <Zap className="logo-icon" fill="var(--primary)" />
        <span>Kite</span>
      </Link>
      
      <div className="nav-links">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
            {location.pathname === item.path && (
              <motion.div 
                layoutId="nav-glow"
                className="nav-glow"
                initial={false}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>

      <div className="nav-auth">
        <button className="btn-secondary" onClick={() => navigate('/login')}>Login</button>
        <button className="btn-primary">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
