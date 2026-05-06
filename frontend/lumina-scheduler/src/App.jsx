import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/MeetingsOverview';
import BookingPage from './pages/BookingPage';
import AvailabilitySetup from './pages/AvailabilitySetup';
import MeetingsManagement from './pages/MeetingsManagement';
import LoginPage from './pages/LoginPage';
import Organizations from './pages/Organizations';
import OrgDetail from './pages/OrgDetail';
import Navbar from './components/Navbar';
import GridMotion from './components/GridMotion';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <GridMotion />
        <div className="lumina-glow" style={{ top: '-10%', left: '-10%' }}></div>
        <div className="lumina-glow" style={{ bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)' }}></div>
        
        <Navbar />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book/:user" element={<BookingPage />} />
            <Route path="/availability" element={<AvailabilitySetup />} />
            <Route path="/meetings" element={<MeetingsManagement />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/:id" element={<OrgDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
