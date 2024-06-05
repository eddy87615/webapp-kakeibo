import HeaderBtn from './HeaderBtn';
import './CalendarPage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

function CalendarPage() {
  const { currentDate, setCurrentDate, getMonthlyTotal } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [displayedMonth, setDisplayedMonth] = useState(currentDate); // 新增状态来存储显示的月份
  const [monthlyTotal, setMonthlyTotal] = useState({
    totalExpense: 0,
    totalIncome: 0,
  });

  useEffect(() => {
    document.getElementById('theme-color').setAttribute('content', '#fff4e3');
    document.body.style.backgroundColor = '#fff4e3';
  }, []);

  useEffect(() => {
    const total = getMonthlyTotal(displayedMonth);
    setMonthlyTotal(total);
  }, [displayedMonth, getMonthlyTotal]);

  // const handleMonthChange = ({ activeStartDate }) => {
  //   setSelectedMonth(activeStartDate);
  //   setCurrentDate(activeStartDate);
  // };

  // 只顯示日期數字
  const formatDay = (locale, date) => {
    return date.getDate();
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  };

  const handleMonthChange = ({ activeStartDate }) => {
    setDisplayedMonth(activeStartDate); // 更新显示的月份
  };

  const navigate = useNavigate();

  const handleTodaysList = () => {
    navigate('/Receive', { state: { date: selectedDate } });
  };
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const buttonText = isToday
    ? '今日の明細'
    : `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日の明細`;

  return (
    <div className="calendayHome">
      <div className="headerArea">
        <HeaderBtn link="/" linkName="TOP" />
        <h1>カレンダー</h1>
        <HeaderBtn linkName="今月の明細を削除" id="deleteToday" />
      </div>
      <div className="calendarDiv">
        <Calendar
          locale="ja-JP"
          calendarType="gregory"
          formatDay={formatDay}
          value={selectedDate}
          onClickDay={handleDayClick}
          onActiveStartDateChange={handleMonthChange}
        />
      </div>
      <ul className="accountAll">
        <li>月合計支出：{monthlyTotal.totalExpense}</li>
        <li>月合計収入：{monthlyTotal.totalIncome}</li>
      </ul>
      <button className="todayReceive" onClick={handleTodaysList}>
        {buttonText}
      </button>
    </div>
  );
}

export default CalendarPage;
