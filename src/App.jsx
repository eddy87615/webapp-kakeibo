import { AppProvider } from './AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Receive from './components/Receive';
import CalendarPage from './components/CalendarPage';
import Home from './components/Home';
import ReceiveContainer from './components/ReceiveContainer';
import InstallPrompt from './InstallPrompt';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Receive" element={<Receive />} />
          <Route path="/CalendarPage" element={<CalendarPage />} />
          <Route path="/ReceiveContainer" element={<ReceiveContainer />} />
        </Routes>
      </Router>
      <InstallPrompt />
    </AppProvider>
  );
}
