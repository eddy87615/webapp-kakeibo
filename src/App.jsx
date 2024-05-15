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
      <h1>APP</h1>
    </>
  );
}

export default App;
