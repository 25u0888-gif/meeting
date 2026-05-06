import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Globe } from 'lucide-react';

const AvailabilitySetup = () => {
  const [days, setDays] = useState([
    { name: 'Monday', active: true, slots: [{ from: '09:00', to: '17:00' }] },
    { name: 'Tuesday', active: true, slots: [{ from: '09:00', to: '17:00' }] },
    { name: 'Wednesday', active: true, slots: [{ from: '09:00', to: '17:00' }] },
    { name: 'Thursday', active: true, slots: [{ from: '09:00', to: '17:00' }] },
    { name: 'Friday', active: true, slots: [{ from: '09:00', to: '17:00' }] },
    { name: 'Saturday', active: false, slots: [] },
    { name: 'Sunday', active: false, slots: [] },
  ]);

  const toggleDay = (index) => {
    const newDays = [...days];
    newDays[index].active = !newDays[index].active;
    if (newDays[index].active && newDays[index].slots.length === 0) {
      newDays[index].slots = [{ from: '09:00', to: '17:00' }];
    }
    setDays(newDays);
  };

  const addSlot = (index) => {
    const newDays = [...days];
    newDays[index].slots.push({ from: '09:00', to: '17:00' });
    setDays(newDays);
  };

  const removeSlot = (dayIndex, slotIndex) => {
    const newDays = [...days];
    newDays[dayIndex].slots.splice(slotIndex, 1);
    setDays(newDays);
  };

  return (
    <div className="availability-page">
      <header className="page-header">
        <h1 className="page-title">Availability Settings</h1>
        <p className="page-subtitle">Configure your default working hours and time zone.</p>
      </header>

      <div className="availability-container glass-card">
        <div className="settings-header">
          <div className="timezone-setting">
            <Globe size={18} />
            <span>India Standard Time (GMT+5:30)</span>
            <button className="btn-text">Change</button>
          </div>
          <button className="btn-primary">
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="days-list">
          {days.map((day, i) => (
            <div key={day.name} className={`day-row ${day.active ? 'active' : ''}`}>
              <div className="day-info">
                <div className={`checkbox ${day.active ? 'checked' : ''}`} onClick={() => toggleDay(i)}>
                  {day.active && <div className="check-mark" />}
                </div>
                <span className="day-name">{day.name}</span>
              </div>
              
              <div className="slots-container">
                {day.active ? (
                  day.slots.map((slot, si) => (
                    <div key={si} className="time-slot-row">
                      <input type="time" defaultValue={slot.from} className="time-input glass-card" />
                      <span>-</span>
                      <input type="time" defaultValue={slot.to} className="time-input glass-card" />
                      <button className="btn-icon-danger" onClick={() => removeSlot(i, si)}><Trash2 size={16} /></button>
                    </div>
                  ))
                ) : (
                  <span className="unavailable">Unavailable</span>
                )}
              </div>

              {day.active && (
                <button className="btn-icon-plus" onClick={() => addSlot(i)}>
                  <Plus size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .availability-page {
          padding-bottom: 4rem;
        }
        .availability-container {
          padding: 2rem;
          text-align: left;
        }
        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1rem;
        }
        .timezone-setting {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-muted);
        }
        .day-row {
          display: grid;
          grid-template-columns: 150px 1fr 50px;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border);
        }
        .day-row.active {
          background: var(--surface);
        }
        .day-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .checkbox {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 2px solid var(--border);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .checkbox.checked {
          background: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }
        .check-mark {
          width: 10px;
          height: 6px;
          border-left: 2px solid white;
          border-bottom: 2px solid white;
          transform: rotate(-45deg);
          margin-bottom: 2px;
        }
        .day-name {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .slots-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .time-slot-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .time-input {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          color: var(--text);
          font-weight: 500;
          border: 1px solid var(--border);
          background: var(--glass);
        }
        .unavailable {
          color: var(--text-muted);
          font-style: italic;
        }
        .btn-icon-plus {
          background: none;
          border: none;
          color: var(--primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-icon-danger {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .btn-icon-danger:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default AvailabilitySetup;
