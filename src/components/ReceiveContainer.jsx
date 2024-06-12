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

  const totalIncome = filteredItems.reduce(
    (sum, item) => (item.type === 'income' ? sum + item.price : sum),
    0
  );
  const totalExpense = filteredItems.reduce(
    (sum, item) => (item.type === 'expense' ? sum + item.price : sum),
    0
  );

  const today = new Date().toDateString() === selectedDate;

  // const handleSave = async () => {
  //   const container = containerRef.current;
  //   if (!container) {
  //     console.error('Container ref is not set');
  //     return;
  //   }

  //   const cloneContainer = container.cloneNode(true);
  //   document.body.appendChild(cloneContainer);

  //   const h1 = cloneContainer.querySelector('h1');
  //   if (h1) {
  //     h1.textContent = `${new Date(selectedDate).getFullYear()}年${
  //       new Date(selectedDate).getMonth() + 1
  //     }月${new Date(selectedDate).getDate()}日の明細`;
  //   }

  //   // 设置样式以确保克隆的容器完全展开
  //   cloneContainer.style.position = 'absolute';
  //   cloneContainer.style.left = '-9999px';
  //   cloneContainer.style.top = '-9999px';
  //   cloneContainer.style.width = `${container.scrollWidth}px`;
  //   cloneContainer.style.height = `${container.scrollHeight}px`;
  //   cloneContainer.style.overflow = 'visible';

  //   // 隐藏删除按钮
  //   const deleteBtns = cloneContainer.querySelectorAll('.deleteBtn');
  //   deleteBtns.forEach((btn) => {
  //     btn.style.opacity = '0';
  //   });

  //   html2canvas(cloneContainer, {
  //     useCORS: true,
  //     scale: 1,
  //   })
  //     .then((canvas) => {
  //       canvas.toBlob((blob) => {
  //         const url = URL.createObjectURL(blob);
  //         const link = document.createElement('a');
  //         link.style.display = 'none'; // 确保链接不会在页面上显示
  //         link.href = url;
  //         link.download = 'downloaded_image.jpg'; // 指定下载文件名
  //         document.body.appendChild(link); // Firefox requires the link to be in the body
  //         link.click();
  //         document.body.removeChild(link); // remove the link when done

  //         document.body.removeChild(cloneContainer); // Remove the clone container when done
  //       }, 'image/jpeg');
  //     })
  //     .catch((err) => {
  //       console.error('html2canvas error:', err);
  //       document.body.removeChild(cloneContainer);
  //     });
  // };

  const handleShare = async () => {
    const container = containerRef.current;
    if (!container) {
      console.error('Container ref is not set');
      return;
    }

    // 克隆容器并应用样式
    const cloneContainer = container.cloneNode(true);
    document.body.appendChild(cloneContainer);

    // 修改克隆的容器中的 h1 标签内容
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
      const canvas = await html2canvas(cloneContainer);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg')
      );
      const file = new File(
        [blob],
        `${new Date(selectedDate).getFullYear()}年${
          new Date(selectedDate).getMonth() + 1
        }月${new Date(selectedDate).getDate()}日の明細.jpg`,
        { type: 'image/jpeg' }
      );

      const shareData = {
        files: [file],
        title: 'Shared Image',
        text: 'Check out this detailed image!',
      };

      // 使用 Web Share API 分享图像
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Image shared successfully');
      } else {
        console.error('Web Share API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      document.body.removeChild(cloneContainer); // 清除克隆容器
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
          <button onClick={handleShare}>保存</button>
          {/* <button>共有</button> */}
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
