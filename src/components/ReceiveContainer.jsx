import { useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import './ReceiveContainer.css';
import { useEffect, useState } from 'react';
import ConfirmWindow from './ConfirmWindow';

export default function ReceiveContainer() {
  const { currentDate, items, handleDeleteItems } = useAppContext();
  const location = useLocation();
  const { date } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const dateKey = currentDate.toDateString();
    const newFilteredItems = items[dateKey] || [];
    setFilteredItems(newFilteredItems);
  }, [currentDate, items]);

  const handleDeleteAll = () => {
    setTimeout(() => {
      handleDeleteItems(selectedDate);
      setIsModalOpen(false);
    }, 300);
  };
  const handleCloseModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };
  const handleOpenModal = () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 300);
  };

  const selectedDate = date
    ? new Date(date).toDateString()
    : new Date().toDateString();

  const totalIncome = filteredItems.reduce(
    (sum, item) => (item.type === 'income' ? sum + item.price : sum),
    0
  );
  const totalExpense = filteredItems.reduce(
    (sum, item) => (item.type === 'expense' ? sum + item.price : sum),
    0
  );

  return (
    <>
      <div className="receiveandBtn">
        <ol className="receiveContainer">
          <h1>{`${currentDate.getFullYear()}年${
            currentDate.getMonth() + 1
          }月${currentDate.getDate()}日の明細`}</h1>
          {filteredItems.map((entry, index) => (
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
          <button onClick={handleOpenModal}>削除</button>
          <button>保存</button>
          <button>共有</button>
        </div>
      </div>

      <ConfirmWindow
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteAll}
        confirmText="本当に今日の記録を全て削除しますか？"
      />
    </>
  );
}
