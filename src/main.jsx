import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import CalendarPage from './components/CalendarPage';
import Receive from './components/Receive';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/CalendarPage" element={<CalendarPage />} />
      <Route path="/Receive" element={<Receive />} />
    </Routes>
  </Router>
);
