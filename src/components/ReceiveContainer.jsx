/* eslint-disable react/prop-types */
import './ReceiveContainer.css';

export default function ReceiveContainer({ items = [] }) {
  console.log('Received items:', items);
  return (
    <>
      <ol className="receiveContainer">
        <h1>今日の明細</h1>
        {items.map((entry, index) => (
          <div key={index}>
            <li className="receiveList">
              {entry.itemName}
              <span>{entry.price}</span>
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
