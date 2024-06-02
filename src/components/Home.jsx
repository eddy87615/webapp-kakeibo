import { useAppContext } from '../AppContext';
import './Home.css';
import HeaderBtn from './HeaderBtn';
import CalendarBtn from './CalendarBtn';
import InputForm from './InputForm';

// eslint-disable-next-line react/prop-types
export default function Home() {
  const {
    sortMoney,
    handleSwitch,
    btnDisabled,
    handleAddItems,
    items,
    setItems,
  } = useAppContext();
  console.log('setItems in Home component:', setItems);
  return (
    <div className={`${sortMoney ? 'homeIncome' : 'homeSpend'}`}>
      <div className="headerArea">
        <HeaderBtn link="/Receive" linkName="今日の明細" />
        <CalendarBtn items={items} setItems={setItems} />
        <HeaderBtn link="/CalendarPage" linkName="カレンダー" id="calendar" />
      </div>
      <InputForm
        onSwitchMode={handleSwitch}
        sortMoney={sortMoney}
        btnDisabled={btnDisabled}
        handleAddItems={handleAddItems}
      />
    </div>
  );
}
