import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/console" element={<Console />} />
          <Route path="/management" element={<Management />} />
          
          {/* Optional: 404 page for unknown routes */}
          <Route path="*" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>WELCOME TO THE TERMINAL</h1>
              <p>The Product Of <a target='_blank' href='appdevloper.com'>Appdevloper</a> </p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
