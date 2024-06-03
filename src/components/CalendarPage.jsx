import HeaderBtn from './HeaderBtn';
import './CalendarPage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  const formatDay = (locale, date) => {
    return date.getDate(); // 只顯示日期數字
  };
  return (
    <div className="calendayHome">
      <div className="headerArea">
        <HeaderBtn link="/" linkName="TOP" />
        <h1>カレンダー</h1>
        <HeaderBtn linkName="今日の明細を削除" id="deleteToday" />
      </div>
      <div className="calendarDiv">
        <Calendar locale="ja-JP" calendarType="gregory" formatDay={formatDay} />
      </div>
      <ul className="accountAll">
        <li>月合計支出：111</li>
        <li>月合計収入：222</li>
      </ul>
      <button>今日の明細</button>
    </div>
  );
}

export default CalendarPage;
