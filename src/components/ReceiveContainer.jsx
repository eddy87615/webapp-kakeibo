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
      </ol>
    </>
  );
}
