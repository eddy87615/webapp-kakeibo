import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="header">
        <Header link="/CalendarPage" linkName="カレンダー" />
        <p className="dateTitle">2024年06月01日</p>
        <Header link="/Receive" linkName="今日の明細" />
      </div>
      <div className="switchInput">
        <button className="switchBtn pressed">支出</button>
        <button className="switchBtn">収入</button>
      </div>
      <div className="inputArea">
        <div className="inputbox">
          <label>項目</label>
          <input type="text" />
        </div>
        <div className="inputbox">
          <label>金額</label>
          <input type="number" />
        </div>
        <input type="submit" />
      </div>
      <h1>APP</h1>
    </>
  );
}

export default App;
