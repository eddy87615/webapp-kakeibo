import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Receive from './components/Receive';
import CalendarPage from './components/CalendarPage';
import Home from './components/Home';
import ReceiveContainer from './components/ReceiveContainer';

import './App.css';

export default function App() {
  const [sortMoney, setSortMoney] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleSwitch = () => {
    setSortMoney(!sortMoney);
    setBtnDisabled(!btnDisabled);
  };

  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => {
    console.log('New item added:', item);
    setItems([...items, item]);
  };

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
              items={items}
              setItems={setItems}
            />
          }
        />
        <Route
          path="/Receive"
          element={<Receive items={items} handleAddItems={handleAddItems} />}
        />
        <Route path="/CalendarPage" element={<CalendarPage />} />
        <Route
          path="/ReceiveContainer"
          element={<ReceiveContainer items={items} />}
        />
      </Routes>
    </Router>
  );
}
