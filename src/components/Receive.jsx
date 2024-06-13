import { useEffect } from 'react';
import { useAppContext } from '../AppContext';
import './Receive.css';

import HeaderBtn from './HeaderBtn';
import CalendarBtn from './CalendarBtn';
import ReceiveContainer from './ReceiveContainer';

export default function Receive() {
  const { items, handleAddItems } = useAppContext();
  useEffect(() => {
    document.getElementById('theme-color').setAttribute('content', '#fff4e3');
    document.body.style.backgroundColor = '#fff4e3';
  }, []);
  return (
    <div className="receiveHome">
      <div className="headerArea">
        <HeaderBtn link="/" linkName="トップ" />
        <CalendarBtn navigateOnDateChange={true} />
        <HeaderBtn link="/CalendarPage" linkName="カレンダー" id="calendar" />
      </div>
      <ReceiveContainer items={items} handleAddItems={handleAddItems} />
    </div>
  );
}
