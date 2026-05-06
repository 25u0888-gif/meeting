import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe, Clock, Calendar } from 'lucide-react';
import CurvedLoop from '../components/CurvedLoop';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempSelectedDate, setTempSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [booked, setBooked] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [meetingDescription, setMeetingDescription] = useState('');
  const [addingDescription, setAddingDescription] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('Personal');

  const times = ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM', '1:30 PM', '2:00 PM', '3:30 PM', '4:00 PM'];

  return (
    <div className="booking-page">
      {booked ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="booking-container glass-card success-view"
        >
          <div className="success-icon glass-card">✓</div>
          <h2>Schedule Confirmed!</h2>
          <p>Your meeting with Abhishek has been successfully scheduled.</p>
          <div className="success-details">
            <div className="meta-item"><Calendar size={18} /> <span>Monday, May 18, 2026</span></div>
            <div className="meta-item"><Clock size={18} /> <span>{selectedTime}</span></div>
          </div>
          <button className="btn-primary" onClick={() => window.location.href = '/'}>Back to Home</button>
        </motion.div>
      ) : (
        <div className="booking-container glass-card">
          <div className="booking-info">
            <div className="profile">
              <div className="avatar glass-card">A</div>
              <h3>Abhishek</h3>
            </div>
            <h2 className="event-title">Schedule Meeting</h2>
            <div className="event-meta">

              <div className="meta-item">
                <Globe size={18} />
                <span>India Standard Time</span>
              </div>
            </div>
            <p className="event-desc">
              A quick sync to discuss project updates, blockers, and next steps. 
              Please choose a time that works best for you.
            </p>
          </div>

          <div className="booking-selection">
            {!selectedDate ? (
              <div className="calendar-view">
                <div className="calendar-header">
                  <h3>May 2026</h3>
                  <div className="calendar-nav">
                    <button className="btn-icon"><ChevronLeft size={18} /></button>
                    <button className="btn-icon"><ChevronRight size={18} /></button>
                  </div>
                </div>
                <div className="calendar-grid">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="calendar-day-head">{day}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => {
                    const day = i + 1;
                    return (
                      <button 
                        key={i} 
                        className={`calendar-day ${tempSelectedDate === day ? 'active' : ''}`}
                        onClick={() => setTempSelectedDate(day)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <button 
                  className="btn-primary confirm-mtg-btn" 
                  disabled={!tempSelectedDate}
                  onClick={() => tempSelectedDate && setSelectedDate(tempSelectedDate)}
                >
                  Confirm Meeting
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="time-view"
              >
                <div className="time-header">
                  <button className="btn-icon" onClick={() => setSelectedDate(null)}><ChevronLeft size={18} /></button>
                  <h3>Monday, May {selectedDate}</h3>
                </div>
                <div className="time-grid">
                  {times.map(time => (
                    <button 
                      key={time} 
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {selectedTime && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                      {!addingDescription && !generatedLink ? (
                        <button 
                          className="btn-primary confirm-btn"
                          style={{ marginTop: 0 }}
                          onClick={() => setAddingDescription(true)}
                        >
                          Add Meeting Description
                        </button>
                      ) : addingDescription && !generatedLink ? (
                        <div className="description-input-box" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div className="form-group">
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Select Organization</label>
                            <select 
                              className="glass-card"
                              value={selectedOrg}
                              onChange={(e) => setSelectedOrg(e.target.value)}
                              style={{ 
                                width: '100%', 
                                padding: '0.75rem 1rem', 
                                borderRadius: '10px', 
                                background: 'var(--glass)', 
                                border: '1px solid var(--border)', 
                                color: 'white',
                                outline: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="Personal">Personal (No Org)</option>
                              <option value="TechFlow Systems">TechFlow Systems</option>
                              <option value="Design Collective">Design Collective</option>
                              <option value="Marketing Hub">Marketing Hub</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>Meeting Description</label>
                            <textarea 
                              className="glass-card" 
                              placeholder="What is this meeting about?"
                              value={meetingDescription}
                              onChange={(e) => setMeetingDescription(e.target.value)}
                              style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                borderRadius: '12px', 
                                background: 'var(--glass)', 
                                border: '1px solid var(--border)', 
                                color: 'white',
                                minHeight: '100px',
                                outline: 'none',
                                resize: 'none'
                              }}
                            />
                          </div>
                          <button 
                            className="btn-primary" 
                            disabled={!meetingDescription.trim()}
                            onClick={() => {
                              setAddingDescription(false);
                              setGeneratedLink(`https://kite.com/book/abhishek/${selectedDate}-${selectedTime.replace(/[: ]/g, '').toLowerCase()}`);
                            }}
                          >
                            Create your link
                          </button>
                        </div>
                      ) : (
                        <div className="generated-link-box glass-card" style={{ padding: '1rem', border: '1px solid var(--primary)', borderRadius: '12px', textAlign: 'center' }}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your custom booking link:</p>
                          <a href="#" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', wordBreak: 'break-all' }}>{generatedLink}</a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <div className="booking-footer">
        <CurvedLoop 
          marqueeText="Kite Scheduler ✦ Effortless Meetings ✦ Smart Productivity ✦ " 
          speed={1.2} 
          curveAmount={150} 
          className="booking-marquee"
        />
      </div>

      <style>{`
        .booking-footer {
          width: 100%;
          max-width: 1440px;
          margin-top: 4rem;
          opacity: 0.8;
          color: #fff;
        }
        .booking-marquee {
          color: #fff;
          font-weight: 700;
        }
        .success-view {
          display: flex !important;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          gap: 1.5rem;
          text-align: center;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          margin-bottom: 1rem;
        }
        .success-details {
          display: flex;
          gap: 2rem;
          margin: 1rem 0 2rem 0;
          color: var(--text-muted);
        }
        .booking-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 4rem 1rem;
        }
        .booking-container {
          width: 100%;
          max-width: 1000px;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          overflow: hidden;
          min-height: 500px;
        }
        .booking-info {
          padding: 3rem;
          border-right: 1px solid var(--glass-border);
          text-align: left;
        }
        .profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .avatar {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--primary);
        }
        .event-title {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .event-meta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
          color: var(--text-muted);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .event-desc {
          color: var(--text-muted);
          line-height: 1.6;
        }
        .booking-selection {
          padding: 3rem;
          background: var(--surface);
        }
        .calendar-header, .time-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .calendar-nav {
          display: flex;
          gap: 0.5rem;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }
        .calendar-day-head {
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
          padding-bottom: 1rem;
        }
        .calendar-day {
          aspect-ratio: 1;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }
        .calendar-day:hover:not(.disabled) {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary);
          border-color: var(--primary);
        }
        .calendar-day.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 0 15px var(--primary-glow);
        }
        .calendar-day.disabled {
          color: rgba(255, 255, 255, 0.1);
          cursor: not-allowed;
        }
        .time-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          max-height: 350px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
        .time-slot {
          width: 100%;
          padding: 1rem;
          background: var(--glass);
          border: 1px solid var(--border);
          color: var(--text);
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .time-slot:hover {
          border-color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
        }
        .time-slot.selected {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 0 15px var(--primary-glow);
        }
        .confirm-btn {
          width: 100%;
          margin-top: 1.5rem;
        }
        .confirm-mtg-btn {
          width: 100%;
          margin-top: 2rem;
          padding: 1rem;
        }
        .confirm-mtg-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }
        @media (max-width: 768px) {
          .booking-container {
            grid-template-columns: 1fr;
          }
          .booking-info {
            border-right: none;
            border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
