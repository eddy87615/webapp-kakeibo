/* eslint-disable react/prop-types */
// import { useState } from 'react';

import { useEffect, useState } from 'react';
import './InputForm.css';

export default function InputForm({
  onSwitchMode,
  sortMoney,
  btnDisabled,
  handleAddItems,
}) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    const storedItemName = localStorage.getItem('itemName');
    const storedPrice = localStorage.getItem('price');
    const storedMemo = localStorage.getItem('memo');
    if (storedItemName) setItemName(storedItemName);
    if (storedPrice) setPrice(storedPrice);
    if (storedMemo) setMemo(storedMemo);
  }, []);

  // 監聽資料變化，並存入本地儲存
  useEffect(() => {
    localStorage.setItem('itemName', itemName);
    localStorage.setItem('price', price);
    localStorage.setItem('memo', memo);
  }, [itemName, price, memo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      itemName,
      price,
      memo,
      type: sortMoney ? 'income' : 'expense',
    };
    handleAddItems(newItem);
    setItemName('');
    setPrice('');
    setMemo('');
  };

  return (
    <>
      <div className="switchInput">
        <button
          className={`switchBtn ${sortMoney ? '' : 'switchBtnPressedSpend'}`}
          onClick={onSwitchMode}
          disabled={btnDisabled}
        >
          支出
        </button>
        <button
          className={`switchBtn ${!sortMoney ? '' : 'switchBtnPressedIncome'}`}
          onClick={onSwitchMode}
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
    </>
  );
}
