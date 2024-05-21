import './Home.css';
import HeaderBtn from './HeaderBtn';
import CalendarBtn from './CalendarBtn';
import InputForm from './InputForm';

// eslint-disable-next-line react/prop-types
export default function Home({ sortMoney, onSwitchMode, btnDisabled, item }) {
  return (
    <div className={`${sortMoney ? 'homeIncome' : 'homeSpend'}`}>
      <div className="headerArea">
        <HeaderBtn link="/receive" linkName="今日の明細" />
        <CalendarBtn />
        <HeaderBtn link="/calendarPage" linkName="カレンダー" id="calendar" />
      </div>
      <InputForm
        onSwitchMode={onSwitchMode}
        sortMoney={sortMoney}
        btnDisabled={btnDisabled}
        item={item}
      />
    </div>
  );
}
