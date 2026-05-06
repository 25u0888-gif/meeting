import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter, MoreVertical, ExternalLink } from 'lucide-react';

const MeetingsManagement = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const meetings = [
    { id: 1, title: 'Project Discovery', attendee: 'John Doe', email: 'john@example.com', date: 'May 18, 2026', time: '10:00 AM - 10:45 AM', status: 'Confirmed' },
    { id: 2, title: 'Product Demo', attendee: 'Sarah Williams', email: 'sarah@design.co', date: 'May 19, 2026', time: '2:30 PM - 3:00 PM', status: 'Pending' },
    { id: 3, title: 'Weekly Sync', attendee: 'Dev Team', email: 'team@internal.com', date: 'May 20, 2026', time: '11:00 AM - 12:00 PM', status: 'Confirmed' },
    { id: 4, title: 'Consultation', attendee: 'Mike Brown', email: 'mike@freelance.org', date: 'May 21, 2026', time: '4:00 PM - 4:30 PM', status: 'Confirmed' },
  ];

  return (
    <div className="meetings-page">
      <header className="page-header">
        <h1 className="page-title">Meetings</h1>
        <p className="page-subtitle">View and manage all your scheduled appointments.</p>
      </header>

      <div className="meetings-container glass-card">
        <div className="meetings-toolbar">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`tab ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past
            </button>
            <button 
              className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </button>
          </div>
          <div className="actions">
            <div className="search-bar glass-card">
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Search meetings..." />
            </div>
            <button className="btn-secondary">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="meetings-table">
          <div className="table-header">
            <span>Attendee / Event</span>
            <span>Date & Time</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="table-body">
            {meetings.map((meeting, i) => (
              <motion.div 
                key={meeting.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="table-row"
              >
                <div className="col-attendee">
                  <div className="attendee-info">
                    <span className="name">{meeting.attendee}</span>
                    <span className="email">{meeting.email}</span>
                  </div>
                  <div className="event-type">
                    <span className="badge glass-card">{meeting.title}</span>
                  </div>
                </div>
                <div className="col-time">
                  <span className="date">{meeting.date}</span>
                  <span className="time">{meeting.time}</span>
                </div>
                <div className="col-status">
                  <span className={`status-pill ${meeting.status.toLowerCase()}`}>
                    {meeting.status}
                  </span>
                  {meeting.status !== 'Pending' && <button className="btn-join-now">Join Now</button>}
                </div>
                <div className="col-actions">
                  <button className="btn-icon"><ExternalLink size={18} /></button>
                  <button className="btn-icon"><MoreVertical size={18} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .meetings-page {
          padding-bottom: 4rem;
        }
        .meetings-container {
          overflow: hidden;
          text-align: left;
        }
        .meetings-toolbar {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }
        .tabs {
          display: flex;
          gap: 0.5rem;
          background: var(--surface);
          padding: 0.25rem;
          border-radius: 12px;
          border: 1px solid var(--border);
        }
        .tab {
          padding: 0.6rem 1.25rem;
          border: none;
          background: none;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .tab.active {
          background: var(--background);
          color: var(--primary);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .actions {
          display: flex;
          gap: 1rem;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 1rem;
          height: 42px;
          border-radius: 10px;
        }
        .search-bar input {
          background: none;
          border: none;
          color: var(--text);
          outline: none;
          font-size: 0.9rem;
        }
        .meetings-table {
          width: 100%;
        }
        .table-header {
          display: grid;
          grid-template-columns: 2.2fr 1.5fr 1.8fr 100px;
          padding: 1rem 2rem;
          background: var(--surface);
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .table-row {
          display: grid;
          grid-template-columns: 2.2fr 1.5fr 1.8fr 100px;
          padding: 1.5rem 2rem;
          align-items: center;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }
        .table-row:hover {
          background: var(--surface-hover);
        }
        .attendee-info {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.5rem;
        }
        .attendee-info .name {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .attendee-info .email {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .col-time {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .col-time .date {
          font-weight: 600;
        }
        .col-time .time {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .status-pill {
          padding: 0.4rem 0.8rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-block;
        }
        .status-pill.confirmed {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }
        .status-pill.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
        .col-status {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn-join-now {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 12px;
          border: none;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-join-now:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35);
          filter: brightness(1.1);
        }
        .col-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--glass);
          border: 1px solid var(--border);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-icon:hover {
          color: var(--primary);
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default MeetingsManagement;
