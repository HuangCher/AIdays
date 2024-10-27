import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import HomePage from "./pages/homePage";
import NaviPage from "./pages/naviPage";
import EvacPage from "./pages/evacPage";
import SafetyPage from "./pages/safetyPage";
import Dashboard from "./pages/Dashboard";
import HurricaneTracker from './pages/HurricaneTracker';

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage  />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
  );
}
export default App;
