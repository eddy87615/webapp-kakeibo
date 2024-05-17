import './App.css';
import Header from './components/Header';

import { useState } from 'react';

function App() {
  const [switchPressed, setSwitchPressed] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleSwitch = () => {
    setSwitchPressed(!switchPressed);
    setBtnDisabled(!btnDisabled);
  };

  return (
    <div className={`${switchPressed ? 'homeIncome' : 'homeSpend'}`}>
      <div className="headerArea">
        <Header link="/CalendarPage" linkName="カレンダー" />
        <p className="dateTitle">
          2024年
          <br />
          06月01日
        </p>
        <Header link="/Receive" linkName="今日の明細" />
      </div>
      <div className="switchInput">
        <button
          className={`switchBtn ${
            switchPressed ? '' : 'switchBtnPressedSpend'
          }`}
          onClick={handleSwitch}
          disabled={btnDisabled}
        >
          支出
        </button>
        <button
          className={`switchBtn ${
            !switchPressed ? '' : 'switchBtnPressedIncome'
          }`}
          onClick={handleSwitch}
          disabled={!btnDisabled}
        >
          収入
        </button>
      </div>
      <div className="inputArea">
        <div className="inputbox">
          <label>項目</label>
          <input type="text" placeholder="雑貨" />
        </div>
        <div className="inputbox">
          <label>金額</label>
          <input type="number" placeholder="2500" />
        </div>
        <input type="submit" value="記入" className="submitBtn" />
      </div>
    </div>
  );
}

export default App;
