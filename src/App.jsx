import { AppProvider } from './AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Receive from './components/Receive';
import CalendarPage from './components/CalendarPage';
import Home from './components/Home';
import ReceiveContainer from './components/ReceiveContainer';
// import InstallPWAButton from './InstallPWAButton';
import { useEffect, useRef } from 'react';

export default function App() {
  const timerRef = useRef(null);

  useEffect(() => {
    const handleTouchStart = (event) => {
      if (event.target.tagName.toLowerCase() === 'a') {
        timerRef.current = setTimeout(() => {
          event.preventDefault();
        }, 500); // 如果需要更短的时间，可以调整这个数值
      }
    };

    const handleTouchEnd = (event) => {
      if (event.target.tagName.toLowerCase() === 'a') {
        clearTimeout(timerRef.current);
      }
    };

    const handleTouchMove = (event) => {
      if (event.target.tagName.toLowerCase() === 'a') {
        clearTimeout(timerRef.current);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
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
    </AppProvider>
  );
}
