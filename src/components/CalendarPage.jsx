import HeaderBtn from './HeaderBtn';
import './CalendarPage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import ConfirmWindow from './ConfirmWindow';
import { ToastContainer, Slide } from 'react-toastify';

function CalendarPage() {
  useEffect(() => {
    document.getElementById('theme-color').setAttribute('content', '#fff4e3');
    document.body.style.backgroundColor = '#fff4e3';
  }, []);

  const {
    currentDate,
    setCurrentDate,
    getMonthlyTotal,
    handleDeleteMonthData,
    formatPrice,
  } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [displayedMonth, setDisplayedMonth] = useState(currentDate); // 新增状态来存储显示的月份
  const [monthlyTotal, setMonthlyTotal] = useState({
    totalExpense: 0,
    totalIncome: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const total = getMonthlyTotal(displayedMonth);
    setMonthlyTotal(total);
  }, [displayedMonth, getMonthlyTotal]);

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
    setTimeout(() => {
      navigate('/Receive', { state: { date: selectedDate } });
    }, 300);
  };
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const buttonText = isToday
    ? '今日の明細'
    : `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日の明細`;

  const handleDeleteCurrentMonth = () => {
    setTimeout(() => {
      const year = displayedMonth.getFullYear();
      const month = displayedMonth.getMonth();
      console.log(`Deleting data for year: ${year}, month: ${month}`);
      handleDeleteMonthData(year, month);
      setIsModalOpen(false);
    }, 300);
  };

  const handleOpenMonthModal = () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 300);
  };

  const handleCloseMonthModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <div className="calendayHome">
      <div className="headerArea">
        <HeaderBtn link="/" linkName="トップ" />
        <h1>カレンダー</h1>
        <HeaderBtn
          linkName="今月の明細を削除"
          id="deleteMonth"
          onClick={handleOpenMonthModal}
        />
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
        <li>月合計支出：{formatPrice(monthlyTotal.totalExpense)}</li>
        <li>月合計収入：{formatPrice(monthlyTotal.totalIncome)}</li>
      </ul>
      <button className="todayReceive" onClick={handleTodaysList}>
        {buttonText}
      </button>
      <ConfirmWindow
        isOpen={isModalOpen}
        onClose={handleCloseMonthModal}
        onConfirm={handleDeleteCurrentMonth}
        confirmText="本当に今月の記録を全て削除しますか？"
      />
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={true}
        transition={Slide}
        theme={'colored'}
      />
    </div>
  );
}

export default CalendarPage;
