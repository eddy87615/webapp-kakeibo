import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleTodaysListonTop = () => {
    const today = new Date().toDateString();
    setTimeout(() => {
      navigate('Receive', { state: { date: today } });
    });
  };

  return (
    <div className={`${sortMoney ? 'homeIncome' : 'homeSpend'}`}>
      <div className="headerArea">
        <HeaderBtn
          // link="/Receive"
          linkName="今日の明細"
          onClick={handleTodaysListonTop}
          id="receiveoftoday"
        />
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
