import HeaderBtn from './HeaderBtn';
import Calendar from 'react-calendar';
import './CalendarPage.css';

function CalendarPage() {
  return (
    <>
      <div className="headerArea">
        <HeaderBtn link="/" linkName="TOP" />
        <h1>カレンダー</h1>
        <HeaderBtn linkName="今日の明細を削除" id="deleteToday" />
      </div>
      <div>
        <Calendar />
      </div>
    </>
  );
}

export default CalendarPage;
