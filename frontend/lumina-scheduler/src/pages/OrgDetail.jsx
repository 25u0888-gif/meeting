import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Calendar, Clock, Check, ArrowRight, ArrowLeft, Plus, X, Search, Building2, MessageSquare } from 'lucide-react';

const MEMBERS = [
  { id: 1, name: 'Alex Rivera', role: 'Product Lead', avatar: 'AR', color: '#3b82f6' },
  { id: 2, name: 'Sarah Chen', role: 'Senior Designer', avatar: 'SC', color: '#8b5cf6' },
  { id: 3, name: 'Marcus Thorne', role: 'Backend Engineer', avatar: 'MT', color: '#10b981' },
  { id: 4, name: 'Elena Rodriguez', role: 'Frontend Developer', avatar: 'ER', color: '#f59e0b' },
  { id: 5, name: 'James Wilson', role: 'Project Manager', avatar: 'JW', color: '#ec4899' },
  { id: 6, name: 'Aiko Tanaka', role: 'QA Analyst', avatar: 'AT', color: '#06b6d4' },
];

const TIME_SLOTS = [
  { date: 'Mon, May 22', slots: ['09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM'] },
  { date: 'Tue, May 23', slots: ['10:00 AM', '01:30 PM', '03:00 PM'] },
  { date: 'Wed, May 24', slots: ['09:30 AM', '11:30 AM', '04:30 PM'] },
];

const OrgDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Members, 2: Time, 3: Details, 4: Success
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState({ title: '', agenda: '' });

  const toggleMember = (mId) => {
    setSelectedMembers(prev => 
      prev.includes(mId) ? prev.filter(i => i !== mId) : [...prev, mId]
    );
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const steps = [
    { n: 1, label: 'Members' },
    { n: 2, label: 'Time' },
    { n: 3, label: 'Details' },
    { n: 4, label: 'Confirm' }
  ];

  return (
    <div className="org-detail-page">
      <header className="page-header">
        <div className="header-left">
          <button className="btn-icon-circle" onClick={() => navigate('/organizations')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title">TechFlow Systems</h1>
            <p className="page-subtitle">Collaborative Workspace</p>
          </div>
        </div>
        {step < 4 && (
          <div className="step-indicator glass-card">
            {steps.map((s) => (
              <div key={s.n} className={`step-dot ${step >= s.n ? 'active' : ''}`}>
                <div className="dot-inner">
                  {step > s.n ? <Check size={12} /> : s.n}
                </div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <main className="org-main">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-container"
            >
              <div className="step-header">
                <h2>Select Members</h2>
                <p>Choose who should attend this collaborative meeting.</p>
              </div>

              <div className="member-selection-grid">
                {MEMBERS.map(member => (
                  <div 
                    key={member.id} 
                    className={`member-select-card glass-card ${selectedMembers.includes(member.id) ? 'selected' : ''}`}
                    onClick={() => toggleMember(member.id)}
                  >
                    <div className="member-avatar" style={{ background: member.color }}>{member.avatar}</div>
                    <div className="member-info">
                      <span className="name">{member.name}</span>
                      <span className="role">{member.role}</span>
                    </div>
                    <div className="checkbox-wrap">
                      <div className="custom-checkbox">
                        {selectedMembers.includes(member.id) && <Check size={14} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="step-actions">
                <button 
                  className="btn-primary btn-xl" 
                  disabled={selectedMembers.length === 0}
                  onClick={nextStep}
                >
                  Continue to Schedule <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-container"
            >
              <div className="step-header">
                <h2>Smart Time Slots</h2>
                <p>Showing common availability for {selectedMembers.length} selected members.</p>
              </div>

              <div className="slots-calendar-view">
                {TIME_SLOTS.map(day => (
                  <div key={day.date} className="date-group">
                    <h3 className="date-title">{day.date}</h3>
                    <div className="slots-row">
                      {day.slots.map(slot => (
                        <button
                          key={slot}
                          className={`slot-pill glass-card ${selectedSlot?.time === slot && selectedSlot?.date === day.date ? 'active' : ''}`}
                          onClick={() => setSelectedSlot({ date: day.date, time: slot })}
                        >
                          <Clock size={14} />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="step-actions">
                <button className="btn-ghost btn-xl" onClick={prevStep}>Back</button>
                <button 
                  className="btn-primary btn-xl" 
                  disabled={!selectedSlot}
                  onClick={nextStep}
                >
                  Add Meeting Details <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-container"
            >
              <div className="step-header">
                <h2>Meeting Details</h2>
                <p>Define the agenda and objective for this session.</p>
              </div>

              <div className="details-form glass-card">
                <div className="summary-banner">
                  <div className="sum-item">
                    <Calendar size={16} />
                    <span>{selectedSlot.date} at {selectedSlot.time}</span>
                  </div>
                  <div className="sum-item">
                    <Users size={16} />
                    <span>{selectedMembers.length} Members invited</span>
                  </div>
                </div>

                <div className="form-field">
                  <label>Meeting Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Weekly Sync or Brainstorming"
                    value={meetingDetails.title}
                    onChange={(e) => setMeetingDetails({...meetingDetails, title: e.target.value})}
                  />
                </div>

                <div className="form-field">
                  <label>Agenda & Notes</label>
                  <textarea 
                    placeholder="What will you discuss?"
                    value={meetingDetails.agenda}
                    onChange={(e) => setMeetingDetails({...meetingDetails, agenda: e.target.value})}
                  />
                </div>

                <div className="selected-members-tags">
                  {selectedMembers.map(mId => {
                    const m = MEMBERS.find(mem => mem.id === mId);
                    return (
                      <div key={mId} className="m-tag glass-card">
                        <div className="m-tag-avatar" style={{ background: m.color }}>{m.avatar}</div>
                        <span>{m.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="step-actions">
                <button className="btn-ghost btn-xl" onClick={prevStep}>Back</button>
                <button 
                  className="btn-primary btn-xl" 
                  disabled={!meetingDetails.title}
                  onClick={nextStep}
                >
                  Confirm & Schedule <Check size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="success-container"
            >
              <div className="success-circle">
                <Check size={48} />
              </div>
              <h2 className="success-title">Meeting Scheduled Successfully 🎉</h2>
              <p className="success-subtitle">Invitations have been sent to all participants.</p>

              <div className="final-summary glass-card">
                <div className="summary-row">
                  <label>Title</label>
                  <span>{meetingDetails.title}</span>
                </div>
                <div className="summary-row">
                  <label>Time</label>
                  <span>{selectedSlot.date} · {selectedSlot.time}</span>
                </div>
                <div className="summary-row">
                  <label>Participants</label>
                  <div className="avatar-stack">
                    {selectedMembers.map(mId => (
                      <div key={mId} className="stack-avatar" style={{ background: MEMBERS.find(m => m.id === mId).color }}>
                        {MEMBERS.find(m => m.id === mId).avatar}
                      </div>
                    ))}
                    <span className="count">+{selectedMembers.length}</span>
                  </div>
                </div>
                <div className="summary-row">
                  <label>Agenda</label>
                  <p>{meetingDetails.agenda}</p>
                </div>
              </div>

              <div className="step-actions centered">
                <button className="btn-primary btn-xl" onClick={() => navigate('/dashboard')}>
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        .org-detail-page { padding-bottom: 4rem; }
        .header-left { display: flex; align-items: center; gap: 1.5rem; }
        .btn-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--glass);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-icon-circle:hover { background: var(--primary); border-color: var(--primary); }
        
        .step-indicator {
          display: flex;
          gap: 2rem;
          padding: 0.75rem 2rem;
          border-radius: 100px;
        }
        .step-dot {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          opacity: 0.4;
          transition: all 0.3s;
        }
        .step-dot.active { opacity: 1; }
        .dot-inner {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
        }
        .step-dot.active .dot-inner {
          background: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }
        .step-dot span { font-size: 0.85rem; font-weight: 600; }

        .org-main { max-width: 800px; margin: 3rem auto 0; }
        .step-header { margin-bottom: 2.5rem; text-align: center; }
        .step-header h2 { font-size: 2rem; color: #fff; margin-bottom: 0.5rem; }
        .step-header p { color: var(--text-muted); }

        .member-selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .member-select-card {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid var(--border);
        }
        .member-select-card:hover { border-color: var(--primary); background: var(--surface); }
        .member-select-card.selected { border-color: var(--primary); background: rgba(59, 130, 246, 0.05); }
        
        .member-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: 0.9rem;
        }
        .member-info { flex: 1; display: flex; flex-direction: column; }
        .member-info .name { font-weight: 600; color: #fff; }
        .member-info .role { font-size: 0.75rem; color: var(--text-muted); }
        
        .custom-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .selected .custom-checkbox { background: var(--primary); border-color: var(--primary); }

        .date-group { margin-bottom: 2.5rem; }
        .date-title { font-size: 1.1rem; color: #fff; margin-bottom: 1rem; }
        .slots-row { display: flex; flex-wrap: wrap; gap: 1rem; }
        .slot-pill {
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          border: 1px solid var(--border);
          color: white;
          font-weight: 600;
          transition: all 0.2s;
        }
        .slot-pill:hover { border-color: var(--primary); }
        .slot-pill.active { background: var(--primary); border-color: var(--primary); box-shadow: 0 0 15px var(--primary-glow); }

        .details-form { padding: 2.5rem; border: 1px solid var(--border); }
        .summary-banner {
          display: flex;
          gap: 2rem;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        .sum-item { display: flex; align-items: center; gap: 0.75rem; color: var(--primary); font-weight: 600; font-size: 0.9rem; }
        
        .form-field { margin-bottom: 1.5rem; }
        .form-field label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
        .form-field input, .form-field textarea {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
          color: white;
          outline: none;
        }
        .form-field textarea { min-height: 120px; resize: none; }
        .form-field input:focus, .form-field textarea:focus { border-color: var(--primary); }

        .selected-members-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
        .m-tag { padding: 0.4rem 0.8rem; border-radius: 100px; display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; border: 1px solid var(--border); }
        .m-tag-avatar { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 800; }

        .step-actions { display: flex; justify-content: flex-end; gap: 1.5rem; margin-top: 3rem; }
        .step-actions.centered { justify-content: center; }

        .success-container { text-align: center; padding: 4rem 0; }
        .success-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
        }
        .success-title { font-size: 2.2rem; color: #fff; margin-bottom: 1rem; }
        .success-subtitle { color: var(--text-muted); margin-bottom: 3rem; }
        
        .final-summary { max-width: 500px; margin: 0 auto; padding: 2rem; text-align: left; border: 1px solid var(--border); }
        .summary-row { margin-bottom: 1.5rem; }
        .summary-row label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .summary-row span { font-size: 1.1rem; color: #fff; font-weight: 600; }
        .summary-row p { color: rgba(255,255,255,0.8); line-height: 1.6; }
        
        .avatar-stack { display: flex; align-items: center; }
        .stack-avatar { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--background); margin-left: -8px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: white; }
        .stack-avatar:first-child { margin-left: 0; }
        .avatar-stack .count { margin-left: 0.75rem; font-size: 0.9rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
};

export default OrgDetail;
