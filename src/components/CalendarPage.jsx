import HeaderBtn from './HeaderBtn';
import './CalendarPage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import { useAppContext } from '../AppContext';

function CalendarPage() {
  const { currentDate, getMonthlyTotal } = useAppContext();

  useEffect(() => {
    document.getElementById('theme-color').setAttribute('content', '#fff4e3');
    document.body.style.backgroundColor = '#fff4e3';
  }, []);

  const formatDay = (locale, date) => {
    return date.getDate(); // 只顯示日期數字
  };

  const { totalExpense, totalIncome } = getMonthlyTotal(currentDate);

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
        <li>月合計支出：{totalExpense}</li>
        <li>月合計収入：{totalIncome}</li>
      </ul>
      <button className="todayReceive">今日の明細</button>
    </div>
  );
}

export default CalendarPage;
