import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Setting from './pages/setting';
import Console from './pages/console';
import Management from './pages/management';
import Navbar from './pages/components/navbar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar will be visible on all pages */}
        <Navbar/>
        <Routes>
          <Route path="./" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/console" element={<Console />} />
          <Route path="/management" element={<Management />} />
          
          {/* Optional: 404 page for unknown routes */}
          <Route path="*" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;