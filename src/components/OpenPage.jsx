import './OpenPage.css';
import { useAppContext } from '../AppContext';

export default function OpenPage() {
  const { sortMoney } = useAppContext();
  return (
    <>
      <div className={`${sortMoney ? 'openpagebgReverse' : 'openpagebg'}`}>
        <div className="left"></div>
        <div className="right"></div>
        <div className="openimg">
          <img src="/logo.svg" alt="logo in starting page" />
          <h1>GrandBook</h1>
          <p>収支を簡単に記録！</p>
        </div>
      </div>
    </>
  );
}
