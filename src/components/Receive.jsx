import './Receive.css';

import HeaderBtn from './HeaderBtn';
import CalendarBtn from './CalendarBtn';
import ReceiveContainer from './ReceiveContainer';

export default function Receive() {
  return (
    <div className="receiveHome">
      <div className="headerArea">
        <HeaderBtn link="/" linkName="TOP" />
        <CalendarBtn />
        <HeaderBtn link="/CalendarPage" linkName="カレンダー" id="calendar" />
      </div>
      <ReceiveContainer />
    </div>
  );
}
