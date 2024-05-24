/* eslint-disable react/prop-types */
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useState } from 'react';
import './CalendarBtn.css';

// eslint-disable-next-line no-unused-vars
export default function CalendarBtn({ items, setItems }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const getCurrentDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so +1 to get 1-12
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年<br />${month}月${day}日`;
  };
  console.log(currentDate);

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <>
      <button className="calendarSwitchBtn" onClick={() => changeDate(-1)}>
        <FaArrowLeft />
      </button>
      <p
        className="dateTitle"
        dangerouslySetInnerHTML={{ __html: getCurrentDate(currentDate) }}
      ></p>
      <button className="calendarSwitchBtn" onClick={() => changeDate(+1)}>
        <FaArrowRight />
      </button>
    </>
  );
}
