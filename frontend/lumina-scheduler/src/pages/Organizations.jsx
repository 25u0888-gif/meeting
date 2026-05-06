import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, ArrowRight, Plus, Search } from 'lucide-react';

const organizations = [
  {
    id: 'org-1',
    name: 'TechFlow Systems',
    desc: 'Enterprise infrastructure and cloud solutions team.',
    members: 24,
    color: '#3b82f6'
  },
  {
    id: 'org-2',
    name: 'Design Collective',
    desc: 'UI/UX design agency focused on premium SaaS products.',
    members: 12,
    color: '#8b5cf6'
  },
  {
    id: 'org-3',
    name: 'Marketing Hub',
    desc: 'Digital marketing and brand growth strategists.',
    members: 8,
    color: '#10b981'
  }
];

const Organizations = () => {
  const navigate = useNavigate();

  return (
    <div className="orgs-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Your <span className="glow-text">Organizations</span></h1>
          <p className="page-subtitle">Manage teams and schedule collaborative meetings.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Create Organization
        </button>
      </header>

      <div className="search-bar-wrap glass-card">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search organizations..." />
      </div>

      <div className="org-grid">
        {organizations.map((org, i) => (
          <motion.div
            key={org.id}
            className="org-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, borderColor: org.color }}
          >
            <div className="org-icon" style={{ background: `${org.color}20`, color: org.color }}>
              <Building2 size={24} />
            </div>
            <h3>{org.name}</h3>
            <p>{org.desc}</p>
            <div className="org-meta">
              <div className="meta-item">
                <Users size={16} />
                <span>{org.members} Members</span>
              </div>
            </div>
            <button className="btn-open" onClick={() => navigate(`/organizations/${org.id}`)}>
              Open <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      <style>{`
        .orgs-page { padding-bottom: 4rem; }
        .search-bar-wrap {
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          gap: 1rem;
          max-width: 500px;
        }
        .search-bar-wrap input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 1rem;
        }
        .search-icon { color: var(--text-muted); }
        
        .org-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .org-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: all 0.3s ease;
        }
        .org-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .org-card h3 { font-size: 1.4rem; color: #fff; }
        .org-card p { color: var(--text-muted); line-height: 1.6; min-height: 3rem; }
        .org-meta { border-top: 1px solid var(--border); padding-top: 1.25rem; margin-top: 0.5rem; }
        .meta-item { display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); font-size: 0.9rem; }
        
        .btn-open {
          margin-top: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          color: white;
          padding: 0.75rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.2s;
        }
        .btn-open:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Organizations;
