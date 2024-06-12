import { useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import './ReceiveContainer.css';
import { useEffect, useState, useRef } from 'react';
import ConfirmWindow from './ConfirmWindow';
import html2canvas from 'html2canvas';

export default function ReceiveContainer() {
  const { items, handleDeleteItems, setCurrentDate } = useAppContext();

  const location = useLocation();
  const { date } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const containerRef = useRef(null);

  const selectedDate = date
    ? new Date(date).toDateString()
    : new Date().toDateString();

  useEffect(() => {
    setCurrentDate(new Date(selectedDate));
    const newFilteredItems = items[selectedDate] || [];
    setFilteredItems(newFilteredItems);
  }, [selectedDate, items, setCurrentDate]);

  const handleDeleteAll = () => {
    setTimeout(() => {
      handleDeleteItems(null, selectedDate);
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

  const handleOpenSaveModal = () => {
    setTimeout(() => {
      setIsSaveModalOpen(true);
    }, 300);
  };
  const handleCloseSaveModal = () => {
    setTimeout(() => {
      setIsSaveModalOpen(false);
    }, 300);
  };

  const totalIncome = filteredItems.reduce(
    (sum, item) => (item.type === 'income' ? sum + item.price : sum),
    0
  );
  const totalExpense = filteredItems.reduce(
    (sum, item) => (item.type === 'expense' ? sum + item.price : sum),
    0
  );

  const today = new Date().toDateString() === selectedDate;

  const handleSave = async () => {
    const container = containerRef.current;
    if (!container) {
      console.error('Container ref is not set');
      return;
    }

    const cloneContainer = container.cloneNode(true);
    document.body.appendChild(cloneContainer);

    const h1 = cloneContainer.querySelector('h1');
    if (h1) {
      h1.textContent = `${new Date(selectedDate).getFullYear()}年${
        new Date(selectedDate).getMonth() + 1
      }月${new Date(selectedDate).getDate()}日の明細`;
    }

    // 设置样式以确保克隆的容器完全展开
    cloneContainer.style.position = 'absolute';
    cloneContainer.style.left = '-9999px';
    cloneContainer.style.top = '-9999px';
    cloneContainer.style.width = `${container.scrollWidth}px`;
    cloneContainer.style.height = `${container.scrollHeight}px`;
    cloneContainer.style.overflow = 'visible';

    // 隐藏删除按钮
    const deleteBtns = cloneContainer.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((btn) => {
      btn.style.opacity = '0';
    });

    try {
      const canvas = await html2canvas(container);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg')
      );

      if (window.showSaveFilePicker) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: 'download_image.jpg',
          type: [
            {
              description: 'JPEG Image',
              accept: { 'image/jpeg': ['.jpg'] },
            },
          ],
        });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        alert('File Saved Successfully!');
      } else {
        console.error('File System Access API is not supported!!');
      }
    } catch (err) {
      console.error('Failed to save the file:', err);
    } finally {
      document.body.removeChild(cloneContainer); // Cleanup: remove the clone container
    }
  };

  return (
    <>
      <div className="receiveandBtn">
        <ol className="receiveContainer" ref={containerRef}>
          <h1>
            {today
              ? '今日の明細'
              : `${new Date(selectedDate).getFullYear()}年${
                  new Date(selectedDate).getMonth() + 1
                }月${new Date(selectedDate).getDate()}日の明細`}
          </h1>
          {filteredItems.map((entry, index) => (
            <div key={index}>
              <div
                className={`${
                  entry.type === 'expense'
                    ? 'listcatogarybg_expense'
                    : 'listcatogarybg_income'
                }`}
              >
                <li className="receiveList">
                  <span className="listName">{entry.itemName}</span>
                  <span
                    className={`listPrice ${
                      entry.type === 'expense'
                        ? 'receiveList_minus'
                        : 'receiveList_plus'
                    }`}
                  >
                    {Math.abs(entry.price)}
                  </span>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteItems(index, selectedDate)}
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
              <div className="blackUnderList"></div>
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
          <button onClick={handleOpenSaveModal}>保存</button>
          <button>共有</button>
        </div>
      </div>

      <ConfirmWindow
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteAll}
        confirmText="本当に今日の記録を全て削除しますか？"
      />
      <ConfirmWindow
        isOpen={isSaveModalOpen}
        onClose={handleCloseSaveModal}
        onConfirm={handleSave}
        confirmText="今日の明細を画像として保存しますか？"
      />
    </>
  );
}
