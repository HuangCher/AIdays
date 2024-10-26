import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import HomePage from "./pages/homePage";
import NaviPage from "./pages/naviPage";
import EvacPage from "./pages/evacPage";
import SafetyPage from "./pages/safetyPage";

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<NaviPage/>} />
          </Routes>
        </Router>
      </div>
  );
}
export default App;
