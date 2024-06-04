import { useAppContext } from '../AppContext';
import './ReceiveContainer.css';

export default function ReceiveContainer() {
  const { items, handleDeleteItems } = useAppContext();
  console.log('Received items:', items);

  const totalIncome = items.reduce(
    (sum, item) => (item.type === 'income' ? sum + item.price : sum),
    0
  );
  const totalExpense = items.reduce(
    (sum, item) => (item.type === 'expense' ? sum + item.price : sum),
    0
  );

  return (
    <>
      <div className="receiveandBtn">
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
              合計：<span>{totalIncome + totalExpense}</span>
            </p>
            <span className="line" />
            <p className="totalPriceAreaTotalExpense">
              合計支出：<span>{totalExpense}</span>
            </p>
            <p className="totalPriceAreaTotalIncome">
              合計収入：<span>{totalIncome}</span>
            </p>
          </div>
        </ol>
        <div className="receiveBtnArea">
          <button>削除</button>
          <button>保存</button>
          <button>共有</button>
        </div>
      </div>
    </>
  );
}
