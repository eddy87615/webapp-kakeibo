import './InputForm.css';

// eslint-disable-next-line react/prop-types
export default function InputForm({ onSwitchMode, sortMoney, btnDisabled }) {
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
      <div className="inputArea">
        <div className="inputbox">
          <label>項目</label>
          <input
            type="text"
            placeholder={sortMoney ? '娘からのお遣い' : '雑貨'}
          />
        </div>
        <div className="inputbox">
          <label>金額</label>
          <input type="number" placeholder={sortMoney ? '12000' : '1290'} />
        </div>
        <div className="inputMemo">
          {/* <input type="text" placeholder="メモはここに入力" /> */}
          <textarea placeholder="メモはここに記入" />
        </div>
        <input type="submit" value="記入" className="submitBtn" />
      </div>
    </>
  );
}