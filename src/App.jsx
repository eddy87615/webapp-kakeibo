import './App.css';
import './components/InputForm.css';

import HeaderBtn from './components/HeaderBtn';
import CalendarBtn from './components/CalendarBtn';
import InputForm from './components/InputForm';

import { useState } from 'react';

export default function App() {
  const [sortMoney, setSortMoney] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleSwitch = () => {
    setSortMoney(!sortMoney);
    setBtnDisabled(!btnDisabled);
  };

  return (
    <div className={`${sortMoney ? 'homeIncome' : 'homeSpend'}`}>
      <div className="headerArea">
        <HeaderBtn link="/Receive" linkName="今日の明細" />
        <CalendarBtn />
        <HeaderBtn link="/CalendarPage" linkName="カレンダー" id="calendar" />
      </div>
      <InputForm
        onSwitchMode={handleSwitch}
        sortMoney={sortMoney}
        btnDisabled={btnDisabled}
      />
    </div>
  );
}
