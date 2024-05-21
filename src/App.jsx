import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Receive from './components/Receive';
import CalendarPage from './components/CalendarPage';
import Home from './components/Home';

import './App.css';

export default function App() {
  // const [items, setItems] = useState([]);
  const [sortMoney, setSortMoney] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleSwitch = () => {
    setSortMoney(!sortMoney);
    setBtnDisabled(!btnDisabled);
  };

  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sortMoney={sortMoney}
              onSwitchMode={handleSwitch}
              btnDisabled={btnDisabled}
              onAddItem={handleAddItems}
            />
          }
        />
        <Route path="/Receive" element={<Receive />} items={items} />
        <Route path="/CalendarPage" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}
