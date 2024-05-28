import { useAppContext } from '../AppContext';
import './ReceiveContainer.css';

export default function ReceiveContainer() {
  const { items, handleDeleteItems } = useAppContext();
  console.log('Received items:', items);
  return (
    <>
      <ol className="receiveContainer">
        <h1>今日の明細</h1>
        {items.map((entry, index) => (
          <div key={index}>
            <li className="receiveList">
              <span className="listName">{entry.itemName}</span>
              <span className="listPrice">{entry.price}</span>
              <button
                className="deleteBtn"
                onClick={() => {
                  handleDeleteItems(index);
                }}
              >
                削除
              </button>
            </li>
            <span
              className={`${entry.memo === '' ? '' : 'receiveDescription'}`}
            >
              {entry.memo}
            </span>
          </div>
        ))}
        <div className="totalPriceArea">
          <p className="totalPriceAreaTotal">
            合計：<span>123</span>
          </p>
          <span className="line" />
          <p className="totalPriceAreaTotalExpense">
            合計支出：<span>123</span>
          </p>
          <p className="totalPriceAreaTotalIncome">
            合計収入：<span>123</span>
          </p>
        </div>
      </ol>
    </>
  );
}
