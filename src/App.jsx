import { AppProvider } from './AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Receive from './components/Receive';
import CalendarPage from './components/CalendarPage';
import Home from './components/Home';
import ReceiveContainer from './components/ReceiveContainer';
import OpenPage from './components/OpenPage';
import { useEffect, useState, useRef } from 'react';

export default function App() {
  const timerRef = useRef(null);
  const [showOpenPage, setIsShowOpenPage] = useState(true);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsShowOpenPage(false);
    }, 2500);

    return () => {
      clearTimeout(timerRef.current);
    };
  });

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (event) => {
      // 记录起始触摸点
      touchStartX = event.touches[0].pageX;
      touchStartY = event.touches[0].pageY;
    };

    const handleTouchMove = (event) => {
      const touchEndX = event.changedTouches[0].pageX;
      const touchEndY = event.changedTouches[0].pageY;

      // 计算触摸移动的距离
      const diffX = Math.abs(touchStartX - touchEndX);
      const diffY = Math.abs(touchStartY - touchEndY);

      // 判断为横向滑动
      if (diffX > diffY) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    let timer = null;
    const handleLongPress = (event) => {
      timer = setTimeout(() => {
        event.preventDefault();
        // 处理长按逻辑
      }, 500); // 长按时间阈值
    };

    const handleTouchEnd = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };

    document.addEventListener('touchstart', handleLongPress, {
      passive: false,
    });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleLongPress);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <AppProvider>
      <Router>
        {showOpenPage && <OpenPage />}
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
