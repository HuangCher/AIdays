import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import HomePage from "./pages/homePage";

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
  );
}
export default App;
