/* eslint-disable react/prop-types */
import './Receive.css';

import HeaderBtn from './HeaderBtn';
import CalendarBtn from './CalendarBtn';
import ReceiveContainer from './ReceiveContainer';

export default function Receive({ items, setItems, handleAddItems }) {
  return (
    <div className="receiveHome">
      <div className="headerArea">
        <HeaderBtn link="/" linkName="TOP" />
        <CalendarBtn items={items} setItems={setItems} />
        <HeaderBtn link="/CalendarPage" linkName="カレンダー" id="calendar" />
      </div>
      <ReceiveContainer items={items} handleAddItems={handleAddItems} />
    </div>
  );
}
