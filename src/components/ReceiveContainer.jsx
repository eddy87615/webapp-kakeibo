import './ReceiveContainer.css';

export default function ReceiveContainer() {
  return (
    <>
      <ol className="receiveContainer">
        <h1>今日の明細</h1>
        <div>
          <li className="receiveList">
            123<span>150000</span>
          </li>
          <span className="receiveDescription">我不知道</span>
        </div>
      </ol>
    </>
  );
}
