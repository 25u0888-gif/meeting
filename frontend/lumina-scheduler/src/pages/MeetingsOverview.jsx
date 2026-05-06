import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowUpRight, Plus, TrendingUp, Link2, Copy, ExternalLink, Building2 } from 'lucide-react';

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const Dashboard = () => {
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(null);

  const copyLink = (key) => {
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 1800);
  };

  const stats = [
    { label: 'Total Meetings', value: '47', icon: <Users size={22} />, trend: '+12% this week', color: '#3b82f6' },
    { label: 'Upcoming (7d)', value: '8', icon: <Calendar size={22} />, trend: 'Next: Today 10 AM', color: '#8b5cf6' },
    { label: 'Avg. Duration', value: '32m', icon: <Clock size={22} />, trend: 'Down 8 min', color: '#10b981' },
  ];

  const upcoming = [
    { title: 'Project Discovery Call', with: 'John Doe', time: '10:00 AM', date: 'Today', type: 'Zoom', color: '#3b82f6', status: 'Confirmed' },
    { title: 'Design Critique', with: 'Sarah Williams', time: '2:30 PM', date: 'Today', type: 'Meet', color: '#8b5cf6', status: 'Pending' },
    { title: 'Sprint Planning', with: 'Dev Team', time: '11:00 AM', date: 'Tomorrow', type: 'Zoom', color: '#10b981', status: 'Confirmed' },
    { title: 'Investor Intro', with: 'Raj Mehta', time: '4:00 PM', date: 'May 20', type: 'Meet', color: '#f59e0b', status: 'Confirmed' },
  ];

  const eventTypes = [
    { name: '15 Min Coffee Chat', slug: 'coffee', duration: '15 min', bookings: 23 },
    { name: 'Design Consultation', slug: 'design', duration: '60 min', bookings: 11 },
    { name: 'Technical Interview', slug: 'interview', duration: '45 min', bookings: 8 },
  ];

  return (
    <div className="dash">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h1 className="page-title">Welcome <span className="glow-text">back</span> 👋</h1>
          <p className="page-subtitle">Here's your scheduling overview for today.</p>
        </div>
        <div className="header-actions">
          <button className="btn-ghost" onClick={() => navigate('/organizations')}>
            <Building2 size={18} /> Organizations
          </button>
          <button className="btn-primary" onClick={() => navigate('/book/me')}>
            <Plus size={18} /> New Event
          </button>
        </div>
      </div>

      {/* Stats */}
      <motion.div className="stats-row" variants={container} initial="hidden" animate="show">
        {stats.map((s, i) => (
          <motion.div key={i} variants={item} className="stat-card glass-card" whileHover={{ y: -4 }}>
            <div className="stat-icon-wrap" style={{ background: s.color + '18', color: s.color }}>{s.icon}</div>
            <div className="stat-body">
              <span className="stat-val">{s.value}</span>
              <span className="stat-lbl">{s.label}</span>
              <span className="stat-trend">{s.trend}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="dash-grid">
        {/* Upcoming meetings */}
        <div className="dash-card glass-card">
          <div className="card-head">
            <h3>Upcoming Meetings</h3>
            <button className="btn-link" onClick={() => navigate('/meetings')}>View all <ArrowUpRight size={14} /></button>
          </div>
          <div className="meetings-feed">
            {upcoming.map((m, i) => (
              <motion.div
                key={i}
                className="meeting-row"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="m-accent" style={{ background: m.color }} />
                <div className="m-time">
                  <span className="m-time-val">{m.time}</span>
                  <span className="m-date">{m.date}</span>
                </div>
                <div className="m-info">
                  <span className="m-title">{m.title}</span>
                  <span className="m-with">with {m.with}</span>
                </div>

                <div className="m-status">
                  <span className={`status-pill-sm ${m.status.toLowerCase()}`}>{m.status}</span>
                </div>
                {m.status !== 'Pending' && <button className="btn-join-now-sm">Join Now</button>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="dash-right">
          {/* Event type links */}
          <div className="dash-card glass-card">
            <div className="card-head">
              <h3>Your Event Links</h3>
              <button className="btn-link" onClick={() => navigate('/book/me')}>Preview <ExternalLink size={14} /></button>
            </div>
            <div className="links-list">
              {eventTypes.map((e, i) => (
                <div key={i} className="link-row">
                  <Link2 size={16} color="var(--primary)" />
                  <div className="link-details">
                    <span className="link-name">{e.name}</span>
                    <span className="link-meta">{e.duration} · {e.bookings} bookings</span>
                  </div>
                  <button className="btn-copy glass-card" onClick={() => copyLink(e.slug)}>
                    {copiedLink === e.slug ? '✓ Copied' : <><Copy size={14} /> Copy</>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Chart placeholder */}
          <div className="dash-card glass-card">
            <div className="card-head"><h3>Weekly Activity</h3></div>
            <div className="chart-area">
              {[60, 85, 45, 90, 70, 40, 80].map((h, i) => (
                <div key={i} className="bar-col">
                  <motion.div
                    className="bar"
                    style={{ height: `${h}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  />
                  <span className="bar-label">{ ['M','T','W','T','F','S','S'][i] }</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dash { padding-bottom: 4rem; }
        .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .header-actions { display: flex; gap: 1rem; align-items: center; }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem; }
        .stat-card { padding: 1.75rem 2rem; display: flex; align-items: center; gap: 1.5rem; cursor: default; }
        .stat-icon-wrap { width: 56px; height: 56px; min-width: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .stat-body { display: flex; flex-direction: column; gap: 0.25rem; }
        .stat-val { font-size: 2.2rem; font-weight: 800; font-family: 'Outfit', sans-serif; line-height: 1; }
        .stat-lbl { font-size: 0.85rem; color: var(--text-muted); }
        .stat-trend { font-size: 0.75rem; color: #10b981; }
        .dash-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 1.5rem; }
        .dash-card { padding: 1.75rem; }
        .dash-right { display: flex; flex-direction: column; gap: 1.5rem; }
        .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .card-head h3 { font-size: 1.05rem; font-weight: 700; }
        .btn-link { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 0.25rem; transition: color 0.2s; }
        .btn-link:hover { color: var(--primary); }
        .meetings-feed { display: flex; flex-direction: column; gap: 0.75rem; }
        .meeting-row { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 14px; background: var(--surface); border: 1px solid var(--border); transition: all 0.2s; }
        .meeting-row:hover { background: var(--surface-hover); border-color: var(--primary-glow); }
        .m-accent { width: 3px; height: 40px; border-radius: 3px; flex-shrink: 0; }
        .m-time { display: flex; flex-direction: column; min-width: 70px; }
        .m-time-val { font-weight: 700; font-size: 0.95rem; font-family: 'Outfit', sans-serif; }
        .m-date { font-size: 0.75rem; color: var(--text-muted); }
        .m-info { flex: 1; display: flex; flex-direction: column; }
        .m-title { font-weight: 600; font-size: 0.95rem; }
        .m-with { font-size: 0.8rem; color: var(--text-muted); }
        .m-type-badge { padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; }
        .btn-join { padding: 0.4rem 0.9rem; background: none; border: 1px solid var(--border); color: var(--text); border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .btn-join:hover { background: var(--primary); border-color: var(--primary); color: white; }
        .links-list { display: flex; flex-direction: column; gap: 1rem; }
        .link-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); }
        .link-details { flex: 1; display: flex; flex-direction: column; }
        .link-name { font-weight: 600; font-size: 0.9rem; }
        .link-meta { font-size: 0.75rem; color: var(--text-muted); }
        .btn-copy { padding: 0.35rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); color: var(--text-muted); font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.3rem; transition: all 0.2s; white-space: nowrap; background: transparent; }
        .btn-copy:hover { color: var(--primary); border-color: var(--primary); }
        .chart-area { display: flex; align-items: flex-end; gap: 0.5rem; height: 100px; padding: 0 0.5rem; }
        .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; height: 100%; justify-content: flex-end; }
        .bar { width: 100%; border-radius: 6px 6px 0 0; background: linear-gradient(180deg, var(--primary), var(--secondary)); transform-origin: bottom; min-height: 4px; }
        .bar-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }
        .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--glass-border); padding: 10px 18px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
        .btn-ghost:hover { background: var(--surface-hover); border-color: var(--primary); }
        
        .status-pill-sm { padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.7rem; font-weight: 700; display: inline-block; }
        .status-pill-sm.confirmed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill-sm.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        
        .btn-join-now-sm {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          border: none;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
        }
        .btn-join-now-sm:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(16, 185, 129, 0.3);
          filter: brightness(1.1);
        }
        .m-status { min-width: 80px; text-align: center; }
        @media (max-width: 1024px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .dash-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .stats-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
