/* eslint-disable react/prop-types */
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import './CalendarBtn.css';

export default function CalendarBtn({ navigateOnDateChange = false }) {
  const { currentDate, changeDate } = useAppContext();
  const navigate = useNavigate();

  const getCurrentDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so +1 to get 1-12
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年<br />${month}月${day}日`;
  };

  const handleChangeDate = (days) => {
    const newDate = changeDate(days);
    if (navigateOnDateChange) {
      navigate('/Receive', { state: { date: newDate } });
    }
  };

  return (
    <>
      <button
        className="calendarSwitchBtn"
        onClick={() => handleChangeDate(-1)}
      >
        <FaArrowLeft />
      </button>
      <p
        className="dateTitle"
        dangerouslySetInnerHTML={{ __html: getCurrentDate(currentDate) }}
      ></p>
      <button
        className="calendarSwitchBtn"
        onClick={() => handleChangeDate(+1)}
      >
        <FaArrowRight />
      </button>
    </>
  );
}
