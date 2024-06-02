import { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import './InputForm.css';

export default function InputForm() {
  useEffect(() => {
    const themeColor = sortMoney ? '#fcd894' : '#ffc3bb';
    document.getElementById('theme-color').setAttribute('content', themeColor);
  }, [sortMoney]);

  const { sortMoney, handleSwitch, btnDisabled, handleAddItems } =
    useAppContext();

  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [memo, setMemo] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedItemName = localStorage.getItem('itemName');
    const storedPrice = localStorage.getItem('price');
    const storedMemo = localStorage.getItem('memo');
    // console.log('Loaded from localStorage:', {
    //   storedItemName,
    //   storedPrice,
    //   storedMemo,
    // });
    if (storedItemName) setItemName(storedItemName);
    if (storedPrice) setPrice(storedPrice);
    if (storedMemo) setMemo(storedMemo);
  }, []);

  // 監聽資料變化，並存入本地儲存
  useEffect(() => {
    localStorage.setItem('itemName', itemName);
    localStorage.setItem('price', price);
    localStorage.setItem('memo', memo);
    // console.log('Saved to localStorage:', { itemName, price, memo });
  }, [itemName, price, memo]);

  const handleSubmit = (e) => {
    if (itemName === '' || price === '') return;
    e.preventDefault();
    const newItem = {
      itemName,
      price: sortMoney
        ? Math.abs(parseFloat(price))
        : -Math.abs(parseFloat(price)),
      memo,
      type: sortMoney ? 'income' : 'expense',
    };
    handleAddItems(newItem);
    setItemName('');
    setPrice('');
    setMemo('');
    localStorage.removeItem('itemName');
    localStorage.removeItem('price');
    localStorage.removeItem('memo');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000);
  };

  return (
    <>
      <div className="switchInput">
        <button
          className={`switchBtn ${sortMoney ? '' : 'switchBtnPressedSpend'}`}
          onClick={handleSwitch}
          disabled={btnDisabled}
        >
          支出
        </button>
        <button
          className={`switchBtn ${!sortMoney ? '' : 'switchBtnPressedIncome'}`}
          onClick={handleSwitch}
          disabled={!btnDisabled}
        >
          収入
        </button>
      </div>
      <form className="inputArea" onSubmit={handleSubmit}>
        <div className="inputbox">
          <label>項目</label>
          <input
            type="text"
            placeholder={sortMoney ? '娘からのお遣い' : '雑貨'}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="inputbox">
          <label>金額</label>
          <input
            type="number"
            placeholder={sortMoney ? '12000' : '1290'}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="inputMemo">
          <textarea
            placeholder="メモはここに記入"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <input type="submit" value="記入" className="submitBtn" />
      </form>

      {showAlert && <div className="doneAlert">記入しました！</div>}
    </>
  );
}
